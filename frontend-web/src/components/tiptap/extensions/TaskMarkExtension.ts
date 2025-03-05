import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { v4 as uuidv4 } from 'uuid';

export interface TaskMarkOptions {
    HTMLAttributes: Record<string, any>;
    onTaskMarkClick?: (attrs: TaskMarkAttributes) => void;
}

interface TaskMarkAttributes {
    id: string | null;
    startOffset: number | null;
    endOffset: number | null;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        taskMark: {
            setTaskMark: () => ReturnType;
            unsetTaskMark: () => ReturnType;
        };
    }
}

export const TaskMarkExtension = Extension.create<TaskMarkOptions>({
    name: 'taskMark',

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'task-mark',
                'data-task-id': '',
            },
            onTaskMarkClick: undefined,
        };
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
        };
    },

    addCommands() {
        return {
            setTaskMark:
                () =>
                ({ commands, state }) => {
                    const { from, to } = state.selection;
                    const attributes = {
                        id: uuidv4(),
                        startOffset: from,
                        endOffset: to,
                    };

                    return commands.setMark(this.name, attributes);
                },
            unsetTaskMark:
                () =>
                ({ commands }) => {
                    return commands.unsetMark(this.name);
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