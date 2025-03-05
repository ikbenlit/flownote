import { Mark } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { v4 as uuidv4 } from 'uuid';

export interface TaskMarkOptions {
    HTMLAttributes: Record<string, any>;
    onTaskMarkRemove?: (taskId: string) => void;
}

interface TaskMarkAttributes {
    id: string | null;
    startOffset: number | null;
    endOffset: number | null;
    markedText?: string | null;
    createdAt?: number | null;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        taskMark: {
            setTaskMark: () => ReturnType;
            unsetTaskMark: () => ReturnType;
            removeTaskMark: (id: string) => ReturnType;
        };
    }
}

export const TaskMarkExtension = Mark.create<TaskMarkOptions>({
    name: 'taskMark',

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'task-mark',
                'data-task-id': '',
            },
            onTaskMarkRemove: undefined,
        };
    },

    // Definieer hoe de markering in HTML wordt weergegeven
    parseHTML() {
        return [
            {
                tag: 'span[data-task-id]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', { ...this.options.HTMLAttributes, ...HTMLAttributes }, 0];
    },

    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('data-task-id'),
                renderHTML: (attributes: TaskMarkAttributes) => ({
                    'data-task-id': attributes.id,
                }),
            },
            startOffset: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('data-start-offset'),
                renderHTML: (attributes: TaskMarkAttributes) => ({
                    'data-start-offset': attributes.startOffset,
                }),
            },
            endOffset: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('data-end-offset'),
                renderHTML: (attributes: TaskMarkAttributes) => ({
                    'data-end-offset': attributes.endOffset,
                }),
            },
            markedText: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('data-marked-text'),
                renderHTML: (attributes: TaskMarkAttributes) => ({
                    'data-marked-text': attributes.markedText,
                }),
            },
            createdAt: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('data-created-at'),
                renderHTML: (attributes: TaskMarkAttributes) => ({
                    'data-created-at': attributes.createdAt,
                }),
            }
        };
    },

    addCommands() {
        return {
            setTaskMark:
                () =>
                ({ commands, state }) => {
                    const { from, to } = state.selection;
                    const markedText = state.doc.textBetween(from, to);
                    const attributes = {
                        id: uuidv4(),
                        startOffset: from,
                        endOffset: to,
                        markedText: markedText,
                        createdAt: Date.now(),
                    };

                    return commands.setMark(this.name, attributes);
                },
            unsetTaskMark:
                () =>
                ({ commands }) => {
                    return commands.unsetMark(this.name);
                },
            removeTaskMark:
                (id: string) =>
                ({ tr, state, dispatch }) => {
                    if (!dispatch) return false;

                    const markType = state.schema.marks.taskMark;
                    if (!markType) {
                        console.error('Geen markType genaamd taskMark gevonden');
                        return false;
                    }
                    
                    let hasRemoved = false;
                    state.doc.descendants((node, pos) => {
                        if (!node.isText) return;

                        const marks = node.marks;
                        const taskMark = marks.find(m => m.type === markType && m.attrs.id === id);
                        
                        if (taskMark) {
                            hasRemoved = true;
                            tr.removeMark(pos, pos + node.nodeSize, markType);
                        }
                    });

                    if (hasRemoved && this.options.onTaskMarkRemove) {
                        this.options.onTaskMarkRemove(id);
                    }

                    return hasRemoved;
                },
        };
    },

    addProseMirrorPlugins() {
        const extension = this;
        
        return [
            new Plugin({
                key: new PluginKey('task-mark-click'),
                props: {
                    /**
                     * Handelt klikken op taskMarks af.
                     * @param view - De huidige editor view
                     * @param pos - De positie in het document waar geklikt is
                     * @returns true als de klik is afgehandeld, false anders
                     */
                    handleClick(
                        view: EditorView,
                        pos: number,
                    ): boolean {
                        // Controleer of we op een taskMark hebben geklikt
                        const { state } = view;
                        const { schema, doc } = state;
                        const range = doc.resolve(pos);
                        const marks = range.marks();
                        const taskMark = marks.find(m => m.type === schema.marks.taskMark);

                        if (taskMark) {
                            // Verwijder de markering
                            const tr = view.state.tr;
                            const markType = schema.marks.taskMark;
                            
                            // Zoek de volledige reikwijdte van de markering
                            let from = pos;
                            let to = pos;
                            
                            // Zoek alle nodes die deze specifieke markering bevatten
                            doc.nodesBetween(0, doc.content.size, (node, nodePos) => {
                                if (node.marks.some(m => m.type === markType && m.attrs.id === taskMark.attrs.id)) {
                                    from = Math.min(from, nodePos);
                                    to = Math.max(to, nodePos + node.nodeSize);
                                }
                            });

                            // Verwijder de markering en dispatch de transactie
                            tr.removeMark(from, to, markType);
                            view.dispatch(tr);

                            // Roep de callback aan als die bestaat
                            if (extension.options.onTaskMarkRemove) {
                                extension.options.onTaskMarkRemove(taskMark.attrs.id);
                            }

                            return true;
                        }

                        return false;
                    }
                },
            }),
        ];
    },
}); 