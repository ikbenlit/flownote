import { Mark } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { v4 as uuidv4 } from 'uuid';
import './TaskMark.css';

export interface TaskMarkOptions {
    HTMLAttributes: Record<string, any>;
    onTaskMarkClick?: (attrs: TaskMarkAttributes) => void;
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
            onTaskMarkClick: undefined,
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
                        console.error('No mark type named taskMark found');
                        return false;
                    }
                    
                    let hasRemoved = false;

                    state.doc.descendants((node, pos) => {
                        if (!node.isText) return;

                        const marksToKeep = node.marks.filter(mark => {
                            if (mark.type === markType && mark.attrs.id === id) {
                                hasRemoved = true;
                                return false;
                            }
                            return true;
                        });

                        if (hasRemoved) {
                            tr.setNodeMarkup(pos, undefined, undefined, marksToKeep);
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
        const key = new PluginKey('task-mark');

        return [
            new Plugin({
                key,
                props: {
                    handleClick: (view, pos) => {
                        const { state } = view;
                        const { doc } = state;
                        const marks = doc.resolve(pos).marks();
                        const taskMark = marks.find(mark => mark.type.name === 'taskMark');

                        if (taskMark) {
                            if (this.options.onTaskMarkClick) {
                                this.options.onTaskMarkClick(taskMark.attrs as TaskMarkAttributes);
                            }
                            return true;
                        }

                        return false;
                    },
                },
            }),
        ];
    },
}); 