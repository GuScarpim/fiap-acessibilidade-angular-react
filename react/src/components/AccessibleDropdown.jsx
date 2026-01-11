import { useState, useRef } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function AccessibleDropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev =>
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev =>
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          onChange(options[focusedIndex]);
          setIsOpen(false);
          setFocusedIndex(-1);
        } else {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setFocusedIndex(0);
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        style={{
          padding: '12px',
          border: '2px solid #ccc',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          minWidth: '200px',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'border-color 0.2s'
        }}
      >
        <span style={{ color: "#2e2e2e" }}>{value ? value.label : placeholder}</span>
        <span aria-hidden="true">
          {isOpen ? <ChevronUpIcon style={{ width: '16px', height: '16px' }} /> : <ChevronDownIcon style={{ width: '16px', height: '16px' }} />}
        </span>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby="dropdown-label"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '2px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={option === value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
                setFocusedIndex(-1);
              }}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: index < options.length - 1 ? '1px solid #eee' : 'none',
                background: focusedIndex === index ? '#ffcccc' :
                           option === value ? '#e7f3ff' : 'white',
                outline: focusedIndex === index ? '2px solid #dc3545' : 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.target.style.backgroundColor = focusedIndex === index ? '#ffcccc' :
                                                                     option === value ? '#e7f3ff' : 'white'}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccessibleDropdown;