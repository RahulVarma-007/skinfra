import { useEffect } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Trees,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects, setActiveCategory, setSelectedProject } from './store/projectsSlice'
import './App.css'

const metrics = [
  { value: '14+', label: 'Active developments' },
  { value: '9', label: 'Prime city zones' },
  { value: '24/7', label: 'Manager availability' },
]

const contactHighlights = [
  'Private walkthrough scheduling',
  'Payment plan consultation',
  'Investor and family purchase support',
]

function formatCategory(category) {
  return category === 'all' ? 'All projects' : category
}

function App() {
  const dispatch = useDispatch()
  const {
    items: projects,
    status,
    error,
    activeCategory,
    selectedProjectId,
  } = useSelector((state) => state.projects)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects())
    }
  }, [dispatch, status])

  const categories = ['all', ...new Set(projects.map((project) => project.category))]
  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ??
    filteredProjects[0] ??
    null

  useEffect(() => {
    if (selectedProject && selectedProject.id !== selectedProjectId) {
      dispatch(setSelectedProject(selectedProject.id))
    }
  }, [dispatch, selectedProject, selectedProjectId])

  return (
    <div className="page-shell">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="ambient ambient-three"></div>

      <header className="topbar glass-panel">
        <div>
          <p className="eyebrow">Project S Estates</p>
          <h1>Present developments with a polished, investor-ready experience.</h1>
        </div>
        <nav className="topbar-links" aria-label="Primary">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="content">
        <section className="hero-grid">
          <article className="hero-card glass-panel">
            <p className="eyebrow">Curated real estate showcase</p>
            <h2>Beautifully framed spaces that feel premium before the first site visit.</h2>
            <p className="hero-copy">
              This standalone frontend reads project details from a dedicated data
              folder, so your listings stay structured and easy to refresh as the
              portfolio grows.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#projects">
                Explore developments
                <ArrowRight size={18} />
              </a>
              <a className="secondary-action" href="#contact">
                Contact manager
              </a>
            </div>
            <div className="metrics-grid">
              {metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="hero-aside glass-panel">
            <div className="spotlight-badge">
              <Sparkles size={18} />
              <span>Designed for active launches</span>
            </div>
            <div className="spotlight-copy">
              <p>Data source</p>
              <h3>`public/data/projects.json`</h3>
              <span>Images are referenced from the project folders and loaded directly into the showcase cards.</span>
            </div>
            <div className="mini-listing">
              <Building2 size={18} />
              <div>
                <strong>Sales-ready storytelling</strong>
                <span>Hero visuals, status chips, amenities, and manager contact paths.</span>
              </div>
            </div>
            <div className="mini-listing">
              <Trees size={18} />
              <div>
                <strong>Luxury atmosphere</strong>
                <span>Glass layers, warm gradients, and responsive layouts for desktop and mobile.</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="experience-grid" id="experience">
          <article className="glass-panel story-card">
            <p className="section-label">Why this structure works</p>
            <h3>Projects stay editable without hardcoding every listing in JSX.</h3>
            <p>
              The UI fetches from a static JSON file and separate image paths, which
              keeps content organized today and prepares the app for an admin upload
              workflow later.
            </p>
          </article>
          <article className="glass-panel story-card">
            <p className="section-label">Manager-first enquiries</p>
            <h3>Each project carries direct contact actions.</h3>
            <p>
              Visitors can move from browsing to calling or emailing the assigned
              manager in one step, with no additional backend required for this version.
            </p>
          </article>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <p className="section-label">Current portfolio</p>
              <h2>Ongoing developments</h2>
            </div>
            <div className="filter-bar glass-panel">
              <Search size={16} />
              <div className="filter-chips" role="tablist" aria-label="Project categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={category === activeCategory ? 'chip active' : 'chip'}
                    onClick={() => dispatch(setActiveCategory(category))}
                    type="button"
                  >
                    {formatCategory(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {status === 'loading' && (
            <div className="state-card glass-panel">Loading project portfolio...</div>
          )}

          {status === 'failed' && (
            <div className="state-card glass-panel">
              Unable to load the project data right now.
              <span>{error}</span>
            </div>
          )}

          {status === 'succeeded' && selectedProject && (
            <div className="portfolio-layout">
              <div className="project-list">
                {filteredProjects.map((project) => (
                  <button
                    className={
                      project.id === selectedProject.id
                        ? 'project-card glass-panel selected'
                        : 'project-card glass-panel'
                    }
                    key={project.id}
                    onClick={() => dispatch(setSelectedProject(project.id))}
                    type="button"
                  >
                    <div className="project-card-top">
                      <span className="status-pill">{project.status}</span>
                      <ChevronRight size={18} />
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.location}</p>
                    <div className="project-meta">
                      <span>{project.priceRange}</span>
                      <span>{project.handover}</span>
                    </div>
                  </button>
                ))}
              </div>

              <article className="featured-project glass-panel">
                <div className="featured-media">
                  <img src={selectedProject.image} alt={selectedProject.name} />
                  <div className="media-overlay">
                    <span>{selectedProject.category}</span>
                    <strong>{selectedProject.name}</strong>
                  </div>
                </div>

                <div className="featured-content">
                  <div className="featured-header">
                    <div>
                      <p className="section-label">Featured development</p>
                      <h3>{selectedProject.name}</h3>
                    </div>
                    <span className="status-pill">{selectedProject.status}</span>
                  </div>

                  <p className="featured-description">{selectedProject.description}</p>

                  <div className="detail-grid">
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="detail-item">
                      <CalendarDays size={16} />
                      <span>{selectedProject.handover}</span>
                    </div>
                    <div className="detail-item">
                      <BedDouble size={16} />
                      <span>{selectedProject.residences}</span>
                    </div>
                    <div className="detail-item">
                      <Bath size={16} />
                      <span>{selectedProject.signatureAmenity}</span>
                    </div>
                  </div>

                  <div className="feature-tags">
                    {selectedProject.features.map((feature) => (
                      <span className="feature-tag" key={feature}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="contact-card" id="contact">
                    <div>
                      <p className="section-label">Manager enquiries</p>
                      <h4>{selectedProject.manager.name}</h4>
                      <span>{selectedProject.manager.role}</span>
                    </div>
                    <div className="contact-actions">
                      <a href={`tel:${selectedProject.manager.phone}`}>
                        <Phone size={16} />
                        {selectedProject.manager.phone}
                      </a>
                      <a href={`mailto:${selectedProject.manager.email}`}>
                        <Mail size={16} />
                        {selectedProject.manager.email}
                      </a>
                    </div>
                    <ul className="contact-highlights">
                      {contactHighlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
