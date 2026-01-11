import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function InaccessibleButton() {
  return (
    <div>
      <div
        onClick={() => alert('Clicado!')}
        style={{ background: '#007bff', color: 'white', padding: '10px 20px', margin: '10px', cursor: 'pointer', display: 'inline-block', borderRadius: '4px' }}
      >
        Clique aqui (div como botão)
      </div>

      <button
        onClick={() => alert('Fechado!')}
        style={{ margin: '10px', background: '#dc3545', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
      >
        <XMarkIcon style={{ width: '16px', height: '16px' }} />
      </button>

      <a
        href="#"
        onClick={(e) => { e.preventDefault(); alert('Ação!'); }}
        style={{ background: '#28a745', color: 'white', padding: '10px 20px', margin: '10px', textDecoration: 'none', display: 'inline-block', borderRadius: '4px' }}
      >
        Executar ação (link agindo como botão)
      </a>
    </div>
  );
}

function AccessibleButton() {
  return (
    <div>
      <button
        type="button"
        onClick={() => alert('Clicado!')}
        style={{ background: '#28a745', color: 'white', padding: '10px 20px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.2s' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Clique aqui
      </button>

      <button
        type="button"
        aria-label="Fechar janela"
        onClick={() => alert('Fechado!')}
        style={{ background: '#dc3545', color: 'white', padding: '10px 15px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '5px' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
      >
        <XMarkIcon style={{ width: '16px', height: '16px' }} />
      </button>

      <button
        type="button"
        onClick={() => alert('Ação executada!')}
        style={{ background: '#ffc107', color: '#000', padding: '10px 20px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.2s' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#e0a800'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#ffc107'}
      >
        Executar ação
      </button>
    </div>
  );
}

export { InaccessibleButton, AccessibleButton };