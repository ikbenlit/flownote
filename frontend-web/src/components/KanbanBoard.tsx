import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Task } from '../../../backend/src/models/Task';
import { useTask } from '../context/TaskContext';
import { useI18n } from '../context/I18nContext';
import TaskItem from './TaskItem';

interface KanbanBoardProps {
  tasks: Task[];
  searchQuery: string;
  filterPriority: string;
}

interface TasksByStatus {
  todo: Task[];
  in_progress: Task[];
  done: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, searchQuery, filterPriority }) => {
  const { updateTask } = useTask();
  const { t } = useI18n();

  // Groepeer taken per status
  const tasksByStatus: TasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    done: tasks.filter(task => task.status === 'done')
  };

  // Functie om de status van een taak bij te werken na drag-and-drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Als er geen bestemming is (buiten een dropzone gedropt), doe niets
    if (!destination) return;

    // Als de taak naar dezelfde positie wordt gesleept, doe niets
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Bepaal de bron- en doelstatus
    const sourceStatus = source.droppableId as 'todo' | 'in_progress' | 'done';
    const destinationStatus = destination.droppableId as 'todo' | 'in_progress' | 'done';

    // Haal de taak op die wordt verplaatst
    const taskToMove = tasksByStatus[sourceStatus][source.index];

    // Als de taak naar een andere kolom wordt verplaatst, update de status
    if (sourceStatus !== destinationStatus) {
      updateTask(taskToMove.id, { 
        status: destinationStatus,
        // Update ook de positie binnen de nieuwe kolom
        position: destination.index
      });
    } else if (source.index !== destination.index) {
      // Als de taak binnen dezelfde kolom wordt verplaatst, update alleen de positie
      updateTask(taskToMove.id, { position: destination.index });
    }
  };

  // Render de kolommen en taken
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Te doen kolom */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{t('tasks.status.todo')}</h3>
          <Droppable droppableId="todo">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[200px] ${
                  snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                {tasksByStatus.todo.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t('tasks.empty.state')}</p>
                ) : (
                  tasksByStatus.todo.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? 'opacity-70' : ''}`}
                        >
                          <TaskItem task={task} compact />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* In uitvoering kolom */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{t('tasks.status.in_progress')}</h3>
          <Droppable droppableId="in_progress">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[200px] ${
                  snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                {tasksByStatus.in_progress.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t('tasks.empty.state')}</p>
                ) : (
                  tasksByStatus.in_progress.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? 'opacity-70' : ''}`}
                        >
                          <TaskItem task={task} compact />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Afgerond kolom */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{t('tasks.status.done')}</h3>
          <Droppable droppableId="done">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 min-h-[200px] ${
                  snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                {tasksByStatus.done.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t('tasks.empty.state')}</p>
                ) : (
                  tasksByStatus.done.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? 'opacity-70' : ''}`}
                        >
                          <TaskItem task={task} compact />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard; 