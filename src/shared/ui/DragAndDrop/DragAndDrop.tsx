import React, { useRef, useState, useEffect } from 'react';
import styles from './DragAndDrop.module.css';
import { Icon } from '../Icon';
import { DragAndDropProps } from './types';

export const DragAndDrop = ({
  className,
  ariaLabel,
  onFilesSelected,
  acceptedFileTypes = ['image/*'],
  multiple = true
}: DragAndDropProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const createPreviews = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    console.log(
      'Файлы из перетаскивания:',
      files.map((file) => file.name)
    );

    const validFiles = files.filter((file) => {
      const isValidType = acceptedFileTypes.some((type: string) => {
        if (type === 'image/*') {
          return file.type.startsWith('image/');
        }
        return file.type === type;
      });
      return isValidType;
    });

    if (validFiles.length > 0) {
      console.log(
        'Подходящие файлы из перетаскивания:',
        validFiles.map((file) => file.name)
      );
      createPreviews(validFiles);
      onFilesSelected(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(
      'Файлы из диалога:',
      files.map((file) => file.name)
    );

    const validFiles = files.filter((file) => {
      const isValidType = acceptedFileTypes.some((type: string) => {
        if (type === 'image/*') {
          return file.type.startsWith('image/');
        }
        return file.type === type;
      });
      return isValidType;
    });

    if (validFiles.length > 0) {
      console.log(
        'Подходящие файлы из диалога:',
        validFiles.map((file) => file.name)
      );
      createPreviews(validFiles);
      onFilesSelected(multiple ? validFiles : [validFiles[0]]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${styles['drag-area']} ${className || ''}`}
      aria-label={ariaLabel}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className={styles.content}>
        <p className={styles['hint-text']}>
          Перетащите или выберите изображения навыка
        </p>
        <div className={styles['select-button']}>
          <Icon name='gallery-add-icon' size={16} className={styles.icon} />
          <span>Выбрать изображения</span>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type='file'
        accept={acceptedFileTypes.join(',')}
        multiple={multiple}
        onChange={handleFileSelect}
        className={styles['hidden-input']}
      />
      {previews.length > 0 && (
        <div className={styles.previews}>
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Изображение ${index + 1}`}
              className={styles['preview-image']}
            />
          ))}
        </div>
      )}
    </div>
  );
};
