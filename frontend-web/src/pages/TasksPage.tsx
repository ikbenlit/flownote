import React, { useState, useMemo } from 'react';
import { useTask } from '../context/TaskContext';
import { useI18n } from '../context/I18nContext';
import { Task } from '../../../backend/src/models/Task';
import { Link } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import KanbanBoard from '../components/KanbanBoard';

type SortField = 'title' | 'priority' | 'status' | 'deadline' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'todo' | 'in_progress' | 'done';
type FilterPriority = 'all' | 'low' | 'medium' | 'high';
type ViewMode = 'list' | 'grid' | 'kanban';

export const TasksPage: React.FC = () => {
    const { tasks, loading, error } = useTask();
    const { t } = useI18n();
    
    // State voor filtering en sortering
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    // Helper functie om te controleren of de huidige weergavemodus overeenkomt
    const isActiveViewMode = (mode: ViewMode): boolean => viewMode === mode;

    // Gefilterde en gesorteerde taken
    const filteredAndSortedTasks = useMemo(() => {
        // Eerst filteren
        let result = [...tasks];
        
        // Filter op status
        if (filterStatus !== 'all') {
            result = result.filter(task => task.status === filterStatus);
        }
        
        // Filter op prioriteit
        if (filterPriority !== 'all') {
            result = result.filter(task => task.priority === filterPriority);
        }
        
        // Filter op zoekterm
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(task => 
                task.title.toLowerCase().includes(query) || 
                task.extractedText.toLowerCase().includes(query)
            );
        }
        
        // Dan sorteren
        result.sort((a, b) => {
            let valueA: any;
            let valueB: any;
            
            // Bepaal de waarden om te vergelijken op basis van het sorteercriterium
            switch (sortField) {
                case 'title':
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
                    break;
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1, undefined: 0 };
                    valueA = priorityOrder[a.priority || 'undefined'];
                    valueB = priorityOrder[b.priority || 'undefined'];
                    break;
                case 'status':
                    const statusOrder = { todo: 1, in_progress: 2, done: 3 };
                    valueA = statusOrder[a.status];
                    valueB = statusOrder[b.status];
                    break;
                case 'deadline':
                    valueA = a.deadline ? a.deadline.getTime() : Number.MAX_SAFE_INTEGER;
                    valueB = b.deadline ? b.deadline.getTime() : Number.MAX_SAFE_INTEGER;
                    break;
                case 'createdAt':
                    valueA = a.createdAt.getTime();
                    valueB = b.createdAt.getTime();
                    break;
                case 'updatedAt':
                    valueA = a.updatedAt.getTime();
                    valueB = b.updatedAt.getTime();
                    break;
                default:
                    valueA = a[sortField];
                    valueB = b[sortField];
            }
            
            // Sorteer op basis van de waarden en sorteerrichting
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        
        return result;
    }, [tasks, sortField, sortOrder, filterStatus, filterPriority, searchQuery]);

    // Functie om de sortering te wijzigen
    const handleSort = (field: SortField) => {
        if (field === sortField) {
            // Als hetzelfde veld, wissel de richting
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Als nieuw veld, stel in als oplopend
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">{t('tasks.title')}</h1>
                <p>{t('app.loading')}</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">{t('tasks.title')}</h1>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    // Render Kanban view
    if (viewMode === 'kanban') {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{t('tasks.kanban.title')}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{t('tasks.subtitle')}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className={`px-3 py-1 rounded-lg ${isActiveViewMode('list') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            onClick={() => setViewMode('list')}
                        >
                            Lijst
                        </button>
                        <button
                            className={`px-3 py-1 rounded-lg ${isActiveViewMode('grid') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid
                        </button>
                        <button
                            className={`px-3 py-1 rounded-lg ${isActiveViewMode('kanban') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            onClick={() => setViewMode('kanban')}
                        >
                            Kanban
                        </button>
                    </div>
                </div>

                {/* Zoek- en filterbalk */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Zoekbalk */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                placeholder={t('notes.search_placeholder')}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        {/* Prioriteit filter */}
                        <div>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value as FilterPriority)}
                            >
                                <option value="all">{t('tasks.priority')}: {t('all')}</option>
                                <option value="high">{t('tasks.priority.high')}</option>
                                <option value="medium">{t('tasks.priority.medium')}</option>
                                <option value="low">{t('tasks.priority.low')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Kanban bord */}
                {filteredAndSortedTasks.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">{t('tasks.empty.state')}</p>
                    </div>
                ) : (
                    <KanbanBoard 
                        tasks={filteredAndSortedTasks} 
                        searchQuery={searchQuery} 
                        filterPriority={filterPriority} 
                    />
                )}
            </div>
        );
    }

    // Render Grid view
    if (viewMode === 'grid') {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{t('tasks.title')}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{t('tasks.subtitle')}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className={`px-3 py-1 rounded-lg ${isActiveViewMode('list') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            onClick={() => setViewMode('list')}
                        >
                            Lijst
                        </button>
                        <button
                            className={`px-3 py-1 rounded-lg ${isActiveViewMode('grid') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid
                        </button>
                        <button
                            className={`px-3 py-1 rounded-lg ${isActiveViewMode('kanban') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            onClick={() => setViewMode('kanban')}
                        >
                            Kanban
                        </button>
                    </div>
                </div>

                {/* Zoek- en filterbalk */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Zoekbalk */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                placeholder={t('notes.search_placeholder')}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        {/* Status filter */}
                        <div>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                            >
                                <option value="all">{t('tasks.status')}: {t('all')}</option>
                                <option value="todo">{t('tasks.status.todo')}</option>
                                <option value="in_progress">{t('tasks.status.in_progress')}</option>
                                <option value="done">{t('tasks.status.done')}</option>
                            </select>
                        </div>
                        
                        {/* Prioriteit filter */}
                        <div>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value as FilterPriority)}
                            >
                                <option value="all">{t('tasks.priority')}: {t('all')}</option>
                                <option value="high">{t('tasks.priority.high')}</option>
                                <option value="medium">{t('tasks.priority.medium')}</option>
                                <option value="low">{t('tasks.priority.low')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Takenlijst in grid */}
                {filteredAndSortedTasks.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">{t('tasks.empty.state')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAndSortedTasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Render List view (default)
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{t('tasks.title')}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{t('tasks.subtitle')}</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        className={`px-3 py-1 rounded-lg ${isActiveViewMode('list') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        onClick={() => setViewMode('list')}
                    >
                        Lijst
                    </button>
                    <button
                        className={`px-3 py-1 rounded-lg ${isActiveViewMode('grid') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        onClick={() => setViewMode('grid')}
                    >
                        Grid
                    </button>
                    <button
                        className={`px-3 py-1 rounded-lg ${isActiveViewMode('kanban') ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        onClick={() => setViewMode('kanban')}
                    >
                        Kanban
                    </button>
                </div>
            </div>

            {/* Zoek- en filterbalk */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Zoekbalk */}
                    <div className="col-span-1 md:col-span-2">
                        <input
                            type="text"
                            placeholder={t('notes.search_placeholder')}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    {/* Status filter */}
                    <div>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                        >
                            <option value="all">{t('tasks.status')}: {t('all')}</option>
                            <option value="todo">{t('tasks.status.todo')}</option>
                            <option value="in_progress">{t('tasks.status.in_progress')}</option>
                            <option value="done">{t('tasks.status.done')}</option>
                        </select>
                    </div>
                    
                    {/* Prioriteit filter */}
                    <div>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value as FilterPriority)}
                        >
                            <option value="all">{t('tasks.priority')}: {t('all')}</option>
                            <option value="high">{t('tasks.priority.high')}</option>
                            <option value="medium">{t('tasks.priority.medium')}</option>
                            <option value="low">{t('tasks.priority.low')}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Takenlijst */}
            {filteredAndSortedTasks.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">{t('tasks.empty.state')}</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    {/* Tabelkop met sorteermogelijkheden */}
                    <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        <div 
                            className="col-span-4 cursor-pointer flex items-center"
                            onClick={() => handleSort('title')}
                        >
                            {t('notes.title_label')}
                            {sortField === 'title' && (
                                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                        <div 
                            className="col-span-2 cursor-pointer flex items-center"
                            onClick={() => handleSort('status')}
                        >
                            {t('tasks.status')}
                            {sortField === 'status' && (
                                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                        <div 
                            className="col-span-2 cursor-pointer flex items-center"
                            onClick={() => handleSort('priority')}
                        >
                            {t('tasks.priority')}
                            {sortField === 'priority' && (
                                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                        <div 
                            className="col-span-2 cursor-pointer flex items-center"
                            onClick={() => handleSort('deadline')}
                        >
                            {t('tasks.deadline')}
                            {sortField === 'deadline' && (
                                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                        <div 
                            className="col-span-2 cursor-pointer flex items-center"
                            onClick={() => handleSort('updatedAt')}
                        >
                            {t('tasks.updated')}
                            {sortField === 'updatedAt' && (
                                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </div>
                    </div>

                    {/* Taakitems */}
                    <div>
                        {filteredAndSortedTasks.map(task => (
                            <div 
                                key={task.id}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                            >
                                <div className="col-span-4">
                                    <div className="font-medium">{task.title}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.extractedText}</div>
                                </div>
                                <div className="col-span-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        task.status === 'todo' 
                                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300' 
                                            : task.status === 'in_progress' 
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' 
                                                : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                                    }`}>
                                        {t(`tasks.status.${task.status}`)}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    {task.priority ? (
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            task.priority === 'low' 
                                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300' 
                                                : task.priority === 'medium' 
                                                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' 
                                                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                                        }`}>
                                            {t(`tasks.priority.${task.priority}`)}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    {task.deadline ? (
                                        <span className="text-sm">
                                            {task.deadline.toLocaleDateString()}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                    )}
                                </div>
                                <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                                    {task.updatedAt.toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksPage; 