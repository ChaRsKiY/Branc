"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Save,
  Eye,
  Plus,
  GripVertical,
  Type,
  Mail,
  Hash,
  Calendar,
  Phone,
  User,
  MessageSquare,
  Check,
  Palette
} from "lucide-react";

interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'tel' | 'date' | 'textarea' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
}

interface FormSettings {
  name: string;
  description: string;
  buttonText: string;
  successMessage: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
}

const fieldTypes = [
  { type: 'text', label: 'Текст', icon: Type },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'number', label: 'Число', icon: Hash },
  { type: 'tel', label: 'Телефон', icon: Phone },
  { type: 'date', label: 'Дата', icon: Calendar },
  { type: 'textarea', label: 'Текстовая область', icon: MessageSquare },
  { type: 'checkbox', label: 'Чекбокс', icon: Check },
];

function SortableField({ field, onEdit, onDelete }: { 
  field: FormField; 
  onEdit: (field: FormField) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2 p-3 bg-white border rounded-lg shadow-sm"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{field.label}</span>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
            {fieldTypes.find(t => t.type === field.type)?.label}
          </span>
          {field.required && (
            <span className="text-xs text-red-500">*</span>
          )}
        </div>
        {field.description && (
          <p className="text-sm text-gray-500 mt-1">{field.description}</p>
        )}
      </div>
      <div className="flex space-x-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(field)}
        >
          Изменить
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(field.id)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}

export default function NewFormPage() {
  const [formSettings, setFormSettings] = useState<FormSettings>({
    name: "Новая форма",
    description: "Описание формы",
    buttonText: "Подписаться",
    successMessage: "Спасибо за подписку!",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    buttonColor: "#3b82f6"
  });

  const [fields, setFields] = useState<FormField[]>([
    {
      id: '1',
      type: 'email',
      label: 'Email адрес',
      placeholder: 'Введите ваш email',
      required: true,
    },
    {
      id: '2',
      type: 'text',
      label: 'Имя',
      placeholder: 'Ваше имя',
      required: false,
    }
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `Новое поле ${fieldTypes.find(t => t.type === type)?.label}`,
      placeholder: `Введите ${fieldTypes.find(t => t.type === type)?.label.toLowerCase()}`,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (updatedField: FormField) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
    setEditingField(null);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const renderFormPreview = () => {
    return (
      <div 
        className="p-6 rounded-lg border-2 border-dashed border-gray-300"
        style={{ 
          backgroundColor: formSettings.backgroundColor,
          color: formSettings.textColor 
        }}
      >
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">{formSettings.name}</h3>
          <p className="text-sm mb-6">{formSettings.description}</p>
          
          <form className="space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={field.id}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={field.id} className="text-sm">
                      {field.placeholder || field.label}
                    </label>
                  </div>
                ) : (
                  <Input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
                {field.description && (
                  <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                )}
              </div>
            ))}
            
            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: formSettings.buttonColor }}
            >
              {formSettings.buttonText}
            </Button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Создать форму</h2>
          <p className="text-muted-foreground">
            Создайте новую форму подписки с помощью конструктора
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Предпросмотр
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Сохранить форму
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Настройки формы</CardTitle>
              <CardDescription>
                Основные параметры вашей формы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="form-name">Название формы</Label>
                <Input
                  id="form-name"
                  value={formSettings.name}
                  onChange={(e) => setFormSettings({
                    ...formSettings,
                    name: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="form-description">Описание</Label>
                <Input
                  id="form-description"
                  value={formSettings.description}
                  onChange={(e) => setFormSettings({
                    ...formSettings,
                    description: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="button-text">Текст кнопки</Label>
                <Input
                  id="button-text"
                  value={formSettings.buttonText}
                  onChange={(e) => setFormSettings({
                    ...formSettings,
                    buttonText: e.target.value
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Поля формы</CardTitle>
              <CardDescription>
                Перетаскивайте поля для изменения порядка
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <SortableField
                        key={field.id}
                        field={field}
                        onEdit={setEditingField}
                        onDelete={deleteField}
                      />
                    ))}
                  </div>
                </SortableContext>
                
                <DragOverlay>
                  {activeId && (
                    <div className="p-3 bg-white border rounded-lg shadow-lg">
                      Перемещение поля...
                    </div>
                  )}
                </DragOverlay>
              </DndContext>
            </CardContent>
          </Card>

          {/* Add Field */}
          <Card>
            <CardHeader>
              <CardTitle>Добавить поле</CardTitle>
              <CardDescription>
                Выберите тип поля для добавления в форму
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {fieldTypes.map((fieldType) => (
                  <Button
                    key={fieldType.type}
                    variant="outline"
                    onClick={() => addField(fieldType.type as FormField['type'])}
                    className="h-16 flex-col"
                  >
                    <fieldType.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{fieldType.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Предпросмотр</CardTitle>
              <CardDescription>
                Так будет выглядеть ваша форма
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderFormPreview()}
            </CardContent>
          </Card>

          {/* Style Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Стиль
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bg-color">Цвет фона</Label>
                <Input
                  id="bg-color"
                  type="color"
                  value={formSettings.backgroundColor}
                  onChange={(e) => setFormSettings({
                    ...formSettings,
                    backgroundColor: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="text-color">Цвет текста</Label>
                <Input
                  id="text-color"
                  type="color"
                  value={formSettings.textColor}
                  onChange={(e) => setFormSettings({
                    ...formSettings,
                    textColor: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="button-color">Цвет кнопки</Label>
                <Input
                  id="button-color"
                  type="color"
                  value={formSettings.buttonColor}
                  onChange={(e) => setFormSettings({
                    ...formSettings,
                    buttonColor: e.target.value
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Field Editor Modal (simplified) */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Редактировать поле</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="field-label">Название поля</Label>
                <Input
                  id="field-label"
                  value={editingField.label}
                  onChange={(e) => setEditingField({
                    ...editingField,
                    label: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="field-placeholder">Плейсхолдер</Label>
                <Input
                  id="field-placeholder"
                  value={editingField.placeholder || ''}
                  onChange={(e) => setEditingField({
                    ...editingField,
                    placeholder: e.target.value
                  })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="field-required"
                  checked={editingField.required || false}
                  onChange={(e) => setEditingField({
                    ...editingField,
                    required: e.target.checked
                  })}
                />
                <Label htmlFor="field-required">Обязательное поле</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingField(null)}>
                  Отмена
                </Button>
                <Button onClick={() => updateField(editingField)}>
                  Сохранить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}