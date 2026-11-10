import { useMemo, useState } from 'react'
import './App.css'
import { evaluatePassword } from './services/passwordEvaluator'
import { improvePassword, type PasswordImprovement } from './services/passwordImprover'
import {
  calculateCombinations,
  formatCombinations,
  generatePassword,
  getAlphabetSize,
  type GeneratorOptions,
} from './services/passwordGenerator'

const initialOptions: GeneratorOptions = {
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
}

function App() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [options, setOptions] = useState(initialOptions)
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [notice, setNotice] = useState('')
  const [improvement, setImprovement] = useState<PasswordImprovement | null>(null)
  const [improvementError, setImprovementError] = useState('')
  const evaluation = useMemo(() => evaluatePassword(password), [password])
  const alphabetSize = getAlphabetSize(options)
  const combinations = alphabetSize ? calculateCombinations(options.length, alphabetSize) : 0n
  async function copyText(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setNotice('Copiada al portapapeles. Evita pegarla en lugares compartidos.')
    } catch {
      setNotice('No se pudo copiar. Comprueba los permisos del navegador.')
    }
  }

  function makePassword() {
    try {
      setGeneratedPassword(generatePassword(options))
      setNotice('')
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No se pudo generar la contraseña.')
    }
  }

  function makeImprovement() {
    try {
      setImprovement(improvePassword(password))
      setImprovementError('')
    } catch (error) {
      setImprovement(null)
      setImprovementError(error instanceof Error ? error.message : 'No se pudo generar una alternativa.')
    }
  }

  function updateOption(key: keyof GeneratorOptions, value: boolean | number) {
    setOptions((current) => ({ ...current, [key]: value }))
    setGeneratedPassword('')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="PassGuard, inicio">
          <span className="brand-mark" aria-hidden="true"><ShieldIcon /></span>
          <span>pass<span>guard</span></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#evaluador">Evaluador</a>
          <a href="#generador">Generador</a>
          <a href="#privacidad">Privacidad</a>
        </nav>
        <span className="local-badge"><span /> 100% local</span>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> TU SEGURIDAD, BAJO TU CONTROL</div>
            <h1>Contraseñas fuertes.<br /><span>Tranquilidad real.</span></h1>
            <p className="hero-description">Evalúa la fortaleza de tus claves y crea nuevas con aleatoriedad criptográfica. Todo sucede en tu navegador.</p>
            <div className="hero-points">
              <div><span className="point-icon"><LockIcon /></span><span><b>Privado por diseño</b><small>Tus claves no salen del dispositivo</small></span></div>
              <div><span className="point-icon"><SparkIcon /></span><span><b>Análisis inteligente</b><small>Reconoce patrones comunes</small></span></div>
            </div>
          </div>

          <section className="analyzer-card" id="evaluador" aria-labelledby="analyzer-title">
            <div className="card-heading">
              <div><span className="section-kicker">01 / EVALUACIÓN</span><h2 id="analyzer-title">Evalúa una contraseña</h2></div>
              <span className="local-tag"><LockIcon /> Local</span>
            </div>
            <label className="field-label" htmlFor="password-input">Contraseña de prueba</label>
            <div className="password-field">
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setImprovement(null)
                  setImprovementError('')
                }}
                autoComplete="off"
                spellCheck={false}
                placeholder="Escribe una contraseña..."
                aria-describedby="privacy-hint"
              />
              <button className="icon-button" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="strength-row" aria-live="polite">
              <div className={`strength-meter${password ? ` strength-${evaluation.score}` : ''}`} aria-label={`Fortaleza: ${evaluation.label}`}>
                {[0, 1, 2, 3, 4].map((segment) => <span key={segment} />)}
              </div>
              <strong className={`strength-label strength-text-${evaluation.score}`}>{evaluation.label}</strong>
              <span className="length-label">{evaluation.length} caracteres</span>
            </div>
            <p className="evaluation-summary">{evaluation.details}</p>

            {password && evaluation.recommendations.length > 0 && (
              <div className="feedback-box">
                <div className="feedback-title"><span className="feedback-symbol">i</span><b>{evaluation.weaknesses.length ? 'Aspectos por mejorar' : 'Buenas prácticas'}</b></div>
                <ul>{evaluation.recommendations.slice(0, 3).map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
                {evaluation.patterns.length > 0 && <p className="pattern-note">Patrones reconocidos: {evaluation.patterns.join(', ')}.</p>}
              </div>
            )}

            <div className="improver-action">
              <button className="improve-button" type="button" onClick={makeImprovement} disabled={!password.trim()}>
                <SparkIcon /> Crear alternativa segura
              </button>
              <p>Genera una clave nueva al azar; no reutiliza fragmentos de la contraseña analizada.</p>
              {improvementError && <p className="improvement-error" role="alert">{improvementError}</p>}
              {improvement && (
                <div className="improvement-result" aria-live="polite">
                  <div className="comparison-grid">
                    <EvaluationSummary title="Original" evaluation={improvement.before} />
                    <EvaluationSummary title="Alternativa" evaluation={improvement.after} />
                  </div>
                  <div className="improved-password">
                    <div><b>Alternativa generada</b><span>Solo en este dispositivo</span></div>
                    <code>{improvement.replacement}</code>
                    <button className="button-secondary" type="button" onClick={() => void copyText(improvement.replacement)}><CopyIcon /> Copiar alternativa</button>
                  </div>
                  <p className="improvement-note">
                    {improvement.after.score > improvement.before.score
                      ? 'La alternativa obtuvo una mejor evaluación heurística.'
                      : 'La alternativa mantiene una evaluación alta; el análisis es orientativo.'}
                  </p>
                </div>
              )}
            </div>

            <p className="privacy-hint" id="privacy-hint"><LockIcon /> El análisis se realiza en tu navegador y no guarda la contraseña.</p>
          </section>
        </section>

        <section className="generator-section" id="generador" aria-labelledby="generator-title">
          <div className="generator-intro">
            <span className="section-kicker">02 / GENERACIÓN</span>
            <h2 id="generator-title">Crea una clave<br /><span>imposible de adivinar.</span></h2>
            <p>Generada en tu dispositivo con Web Crypto API y selección uniforme de caracteres.</p>
            <div className="generator-trust"><span><CheckIcon /> Aleatoriedad criptográfica</span><span><CheckIcon /> Sin servicios externos</span></div>
          </div>
          <div className="generator-card">
            <div className="generator-controls">
              <label htmlFor="length-slider">Longitud <strong>{options.length}</strong></label>
              <input id="length-slider" type="range" min="8" max="64" value={options.length} onChange={(event) => updateOption('length', Number(event.target.value))} aria-valuetext={`${options.length} caracteres`} />
              <div className="range-labels"><span>8</span><span>64 caracteres</span></div>
              <fieldset className="character-options">
                <legend>Conjuntos de caracteres</legend>
                <Toggle label="Letras minúsculas" shortLabel="a–z" checked={options.lowercase} onChange={(checked) => updateOption('lowercase', checked)} />
                <Toggle label="Letras mayúsculas" shortLabel="A–Z" checked={options.uppercase} onChange={(checked) => updateOption('uppercase', checked)} />
                <Toggle label="Números" shortLabel="0–9" checked={options.numbers} onChange={(checked) => updateOption('numbers', checked)} />
                <Toggle label="Símbolos" shortLabel="#&!" checked={options.symbols} onChange={(checked) => updateOption('symbols', checked)} />
              </fieldset>
            </div>
            <div className="generated-output">
              <div className="output-label"><span>Tu nueva contraseña</span><span className="output-lock"><LockIcon /> SOLO EN ESTE DISPOSITIVO</span></div>
              <div className="generated-value" aria-live="polite">{generatedPassword || <span className="output-placeholder">Pulsa generar para crear una clave</span>}</div>
              <div className="output-actions">
                <button className="button-primary" onClick={makePassword} type="button"><SparkIcon /> Generar contraseña</button>
                <button className="button-secondary" onClick={() => void copyText(generatedPassword)} type="button" disabled={!generatedPassword}><CopyIcon /> Copiar</button>
              </div>
              <div className="combinations"><span className="combinations-icon">✳</span><span><b>{alphabetSize ? formatCombinations(combinations) : '—'}</b><small>combinaciones teóricas posibles</small></span></div>
            </div>
            <p className="entropy-note">El cálculo supone una selección aleatoria uniforme en cada posición. No describe la seguridad de una contraseña elegida por una persona.</p>
          </div>
        </section>

        <section className="privacy-banner" id="privacidad">
          <div className="privacy-banner-icon"><ShieldIcon /></div>
          <div><span className="section-kicker">PRIVACIDAD PRIMERO</span><h2>Tus contraseñas son solo tuyas.</h2><p>PassGuard las analiza en memoria dentro de esta pestaña. No usamos almacenamiento, analítica ni enviamos tus claves a ningún servidor.</p></div>
          <div className="privacy-seal"><span><CheckIcon /></span><b>Sin datos<br />enviados</b></div>
        </section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><ShieldIcon /></span><span>pass<span>guard</span></span></a><p>Una herramienta académica para aprender sobre seguridad digital.</p><span className="footer-course">PROYECTO UNIVERSITARIO · 2026</span></footer>
      {notice && <div className="toast" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Cerrar mensaje">×</button></div>}
    </div>
  )
}

function Toggle({ label, shortLabel, checked, onChange }: { label: string; shortLabel: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className={`toggle-option${checked ? ' selected' : ''}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="toggle-box">{checked && <CheckIcon />}</span><span className="toggle-short">{shortLabel}</span><span className="sr-only">{label}</span></label>
}

function EvaluationSummary({ title, evaluation }: { title: string; evaluation: ReturnType<typeof evaluatePassword> }) {
  return (
    <div className={`evaluation-summary-card score-${evaluation.score}`}>
      <span>{title}</span>
      <strong>{evaluation.label}</strong>
      <small>{evaluation.score} / 4 · {evaluation.length} caracteres</small>
    </div>
  )
}

function ShieldIcon() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 6v5.7c0 4.7-3.2 8-8 9.3-4.8-1.3-8-4.6-8-9.3V6l8-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m8.8 12 2.1 2.1 4.4-4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function LockIcon() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3.5" y="8" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 8V5.8a3.5 3.5 0 0 1 7 0V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="12.5" r="1" fill="currentColor"/></svg> }
function SparkIcon() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 2 1.7 5.4L17 9l-5.3 1.7L10 16l-1.7-5.3L3 9l5.3-1.6L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m16 13 .8 2.2L19 16l-2.2.8L16 19l-.8-2.2L13 16l2.2-.8L16 13Z" fill="currentColor"/></svg> }
function CheckIcon() { return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function EyeIcon() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 10s2.8-5 8-5 8 5 8 5-2.8 5-8 5-8-5-8-5Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5"/></svg> }
function EyeOffIcon() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m3 3 14 14M8.6 5.2A8.8 8.8 0 0 1 10 5c5.2 0 8 5 8 5a13 13 0 0 1-2.5 2.8M5.5 5.6C3.2 7.1 2 10 2 10s2.8 5 8 5c.8 0 1.5-.1 2.2-.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8.5 8.5a2.1 2.1 0 0 0 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> }
function CopyIcon() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="7" y="6" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M13 6V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.5"/></svg> }

export default App
