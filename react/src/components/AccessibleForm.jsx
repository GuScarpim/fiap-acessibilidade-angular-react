import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function AccessibleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail deve ter formato válido';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div>
      {showSuccess && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            background: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            marginBottom: '20px'
          }}
        >
          <CheckCircleIcon style={{ width: '20px', height: '20px', color: '#28a745' }} />
          Formulário enviado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: '600px', margin: '20px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <fieldset style={{ border: '2px solid #007bff', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
          <legend style={{ fontWeight: 'bold', padding: '0 10px', color: '#007bff' }}>Informações de Cadastro</legend>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Nome completo *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              style={{ width: '100%', padding: '12px', border: `2px solid ${errors.name ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }}
              required
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : 'name-help'}
            />
            <div id="name-help" style={{ fontSize: '14px', color: '#6c757d', marginTop: '5px' }}>
              Digite seu nome completo como aparece no documento
            </div>
            {errors.name && (
              <div id="name-error" role="alert" style={{ fontSize: '14px', color: '#dc3545', marginTop: '5px' }}>
                {errors.name}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              style={{ width: '100%', padding: '12px', border: `2px solid ${errors.email ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }}
              required
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : 'email-help'}
            />
            <div id="email-help" style={{ fontSize: '14px', color: '#6c757d', marginTop: '5px' }}>
              Usaremos este e-mail para contato
            </div>
            {errors.email && (
              <div id="email-error" role="alert" style={{ fontSize: '14px', color: '#dc3545', marginTop: '5px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Senha *
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              style={{ width: '100%', padding: '12px', border: `2px solid ${errors.password ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }}
              required
              aria-required="true"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : 'password-help'}
            />
            <div id="password-help" style={{ fontSize: '14px', color: '#6c757d', marginTop: '5px' }}>
              Mínimo de 6 caracteres
            </div>
            {errors.password && (
              <div id="password-error" role="alert" style={{ fontSize: '14px', color: '#dc3545', marginTop: '5px' }}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) => handleChange('newsletter', e.target.checked)}
                style={{ marginRight: '10px', width: 'auto' }}
                aria-describedby="newsletter-help"
              />
              Quero receber newsletter
            </label>
            <div id="newsletter-help" style={{ fontSize: '14px', color: '#6c757d', marginTop: '5px' }}>
              Você pode cancelar a qualquer momento
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          style={{
            background: '#007bff',
            color: 'white',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default AccessibleForm;