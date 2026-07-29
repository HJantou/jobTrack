import { ref, onMounted } from 'vue'
import type { Post } from '@/types/Post'


const posts = ref<Post[]>([])
const isLoaded = ref(false)
const isLoading = ref(false)

interface RawPost {
  id: number
  name: string
  description: string
  creationDate: string
  statut: string
}

async function fetchPosts() {
  if (isLoaded.value || isLoading.value) return
  isLoading.value = true
  const response = await fetch('/data/posts.json')
  if (response.ok) {
    const data: RawPost[] = await response.json()
    posts.value = data.map(p => ({
      ...p,
      creationDate: new Date(p.creationDate)
    }))
    isLoaded.value = true
  } else {
    console.log("erreur")
  }
  isLoading.value = false
}

function addPost(newPost: Post) {
  posts.value.unshift({ ...newPost, id: Date.now() })
}

export function useCandidatures() {
  onMounted(() => {
    fetchPosts()
  })

  return { posts, addPost }
}
