import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetch('/data/projects.json')

  if (!response.ok) {
    throw new Error('Project data could not be loaded.')
  }

  return response.json()
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    activeCategory: 'all',
    selectedProjectId: null,
  },
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
      state.selectedProjectId = null
    },
    setSelectedProject(state, action) {
      state.selectedProjectId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.projects
        state.selectedProjectId = action.payload.projects[0]?.id ?? null
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setActiveCategory, setSelectedProject } = projectsSlice.actions

export default projectsSlice.reducer
