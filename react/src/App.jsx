import { useState } from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import {
  InaccessibleButton,
  AccessibleButton,
  AccessibleForm,
  AccessibleModal,
  AccessibleDropdown
} from './components';

function App() {
  const [activeComponent, setActiveComponent] = useState('menu');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [focusedMenuIndex, setFocusedMenuIndex] = useState(0);

  const dropdownOptions = [
    { id: 1, label: 'Opção 1' },
    { id: 2, label: 'Opção 2' },
    { id: 3, label: 'Opção 3' }
  ];

  const menuItems = [
    { id: 'buttons', label: 'Botões Acessíveis vs Inacessíveis', description: 'Demonstra diferença entre botões acessíveis e inacessíveis' },
    { id: 'form', label: 'Formulário Acessível', description: 'Formulário com validação e acessibilidade completa' },
    { id: 'modal', label: 'Modal Acessível', description: 'Modal com gerenciamento de foco e navegação por teclado' },
    { id: 'dropdown', label: 'Dropdown Acessível', description: 'Dropdown com navegação por setas e ARIA attributes' }
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'buttons':
        return (
          <section>
            <h2>Botões Acessíveis vs Inacessíveis</h2>
            <p>Demonstra a diferença entre implementação correta e incorreta de botões.</p>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExclamationTriangleIcon style={{ width: '20px', height: '20px', color: '#dc3545' }} />
              Botões Inacessíveis
            </h3>
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #dc3545' }}>
              <InaccessibleButton />
            </div>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircleIcon style={{ width: '20px', height: '20px', color: '#28a745' }} />
              Botões Acessíveis
            </h3>
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #28a745', background: '#d4edda' }}>
              <AccessibleButton />
            </div>
          </section>
        );

      case 'form':
        return (
          <section>
            <h2>Formulário Acessível</h2>
            <p>Formulário com validação em tempo real, mensagens de erro acessíveis e labels corretos.</p>
            <AccessibleForm />
          </section>
        );

      case 'modal':
        return (
          <section>
            <h2>Modal Acessível</h2>
            <p>Modal com trap de foco, navegação por teclado e gerenciamento de foco adequado.</p>
            <button onClick={() => setIsModalOpen(true)} style={{ background: '#007bff', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}>
              Abrir Modal
            </button>
            <AccessibleModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Modal de Demonstração"
            >
              <p>Este é um modal acessível com gerenciamento de foco.</p>
              <p>Use Tab para navegar dentro do modal, Escape para fechar.</p>
              <p>O foco é automaticamente direcionado para o modal quando aberto.</p>
            </AccessibleModal>
          </section>
        );

      case 'dropdown':
        return (
          <section>
            <h2>Dropdown Acessível</h2>
            <p>Dropdown com navegação por teclado (setas), suporte a Enter/Escape e atributos ARIA corretos.</p>
            <AccessibleDropdown
              options={dropdownOptions}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Selecione uma opção"
            />
            {selectedOption && (
              <p>Selecionado: {selectedOption.label}</p>
            )}
          </section>
        );

      default:
        return (
          <div>
            <h2>Menu de Demonstrações</h2>
            <p>Selecione um componente para ver a demonstração prática de acessibilidade:</p>
            <div
              style={{ display: 'grid', gap: '20px', marginTop: '20px' }}
              onKeyDown={(e) => {
                switch (e.key) {
                  case 'ArrowDown':
                    e.preventDefault();
                    setFocusedMenuIndex(prev => prev < menuItems.length - 1 ? prev + 1 : 0);
                    break;
                  case 'ArrowUp':
                    e.preventDefault();
                    setFocusedMenuIndex(prev => prev > 0 ? prev - 1 : menuItems.length - 1);
                    break;
                  case 'Enter':
                  case ' ':
                    e.preventDefault();
                    setActiveComponent(menuItems[focusedMenuIndex].id);
                    break;
                }
              }}
              tabIndex={0}
            >
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    border: `2px solid ${focusedMenuIndex === index ? '#dc3545' : '#007bff'}`,
                    borderRadius: '8px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: focusedMenuIndex === index ? '#ffe6e6' : 'transparent',
                    outline: focusedMenuIndex === index ? '2px solid #dc3545' : 'none'
                  }}
                  onClick={() => setActiveComponent(item.id)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.borderColor = '#007bff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = focusedMenuIndex === index ? '#ffe6e6' : 'transparent';
                    e.target.style.borderColor = focusedMenuIndex === index ? '#dc3545' : '#007bff';
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveComponent(item.id);
                    }
                  }}
                  aria-label={`Abrir demonstração: ${item.label}`}
                >
                  <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{item.label}</h3>
                  <p style={{ margin: 0, color: '#6c757d' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #007bff', paddingBottom: '20px' }}>
        <h1 style={{ color: '#007bff', margin: '0 0 10px 0' }}>Componentes Acessíveis - React</h1>
        <p style={{ margin: 0, color: '#6c757d' }}>
          Demonstrações práticas de componentes acessíveis seguindo as diretrizes WCAG
        </p>
        {activeComponent !== 'menu' && (
          <button
            onClick={() => setActiveComponent('menu')}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
            aria-label="Voltar ao menu principal"
          >
            ← Voltar ao Menu
          </button>
        )}
      </header>

      <main>
        {renderComponent()}
      </main>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd', color: '#6c757d', fontSize: '14px' }}>
        <p>
          <strong>Dicas de Acessibilidade:</strong><br />
          • Use Tab para navegar entre elementos interativos<br />
          • Pressione Escape para fechar modais ou cancelar ações<br />
          • Use setas do teclado para navegar em listas e menus<br />
          • Elementos focáveis têm indicadores visuais (quando estilos são aplicados)
        </p>
      </footer>
    </div>
  );
}

export default App;
