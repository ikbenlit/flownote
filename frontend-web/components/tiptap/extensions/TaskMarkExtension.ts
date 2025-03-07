import { Mark, mergeAttributes } from '@tiptap/core'
import { v4 as uuidv4 } from 'uuid'

interface TaskMarkOptions {
  HTMLAttributes: Record<string, any>
  onTaskMarkRemove?: (taskId: string) => void
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    taskMark: {
      setTaskMark: () => ReturnType
      removeTaskMark: (taskId: string) => ReturnType
    }
  }
}

export const TaskMarkExtension = Mark.create<TaskMarkOptions>({
  name: 'taskMark',

  addOptions() {
    return {
      HTMLAttributes: {},
      onTaskMarkRemove: undefined,
    }
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-task-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }

          return {
            'data-task-id': attributes.id,
          }
        },
      },
      startOffset: {
        default: null,
        parseHTML: element => element.getAttribute('data-start-offset'),
        renderHTML: attributes => {
          if (!attributes.startOffset) {
            return {}
          }

          return {
            'data-start-offset': attributes.startOffset,
          }
        },
      },
      endOffset: {
        default: null,
        parseHTML: element => element.getAttribute('data-end-offset'),
        renderHTML: attributes => {
          if (!attributes.endOffset) {
            return {}
          }

          return {
            'data-end-offset': attributes.endOffset,
          }
        },
      },
      createdAt: {
        default: null,
        parseHTML: element => element.getAttribute('data-created-at'),
        renderHTML: attributes => {
          if (!attributes.createdAt) {
            return {}
          }

          return {
            'data-created-at': attributes.createdAt,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-task-id]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTaskMark:
        () =>
        ({ commands, state }) => {
          const { from, to } = state.selection
          const attributes = {
            id: uuidv4(),
            startOffset: from,
            endOffset: to,
            createdAt: new Date().toISOString(),
          }

          return commands.setMark(this.name, attributes)
        },
      removeTaskMark:
        taskId =>
        ({ commands, state }) => {
          if (this.options.onTaskMarkRemove) {
            this.options.onTaskMarkRemove(taskId)
          }

          const { doc, tr } = state
          let hasRemoved = false

          doc.descendants((node, pos) => {
            if (!node.isText) return

            const marks = node.marks.filter(mark => 
              mark.type.name === this.name && 
              mark.attrs.id === taskId
            )

            if (marks.length > 0) {
              tr.removeMark(pos, pos + node.nodeSize, this.type)
              hasRemoved = true
            }
          })

          if (hasRemoved) {
            return commands.focus()
          }

          return false
        },
    }
  },

  addPasteRules() {
    return [
      {
        find: /\[\[(.*?)\]\]/g,
        handler: ({ state, range, match }) => {
          const attributes = {
            id: uuidv4(),
            startOffset: range.from,
            endOffset: range.to,
            createdAt: new Date().toISOString(),
          }

          const { tr } = state
          const start = range.from
          const end = range.to
          
          tr.insertText(match[1], start, end)
          tr.addMark(start, start + match[1].length, this.type.create(attributes))
          
          state.apply(tr)
        },
      },
    ]
  },
}) 