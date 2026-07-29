<template>
  <div class="option">
    <input type="text" placeholder="Rechercher une entreprise" v-model="search">
    <select id="choix" v-model="selectedOption" placeholder="option1">
      <option value="Tous les statuts">Tous les statuts</option>
      <option value="envoye">Envoyée</option>
      <option value="entretien">Entretien</option>
      <option value="accepte">Acceptée</option>
      <option value="refuse">Refusée</option>
    </select>
    <button @click="showModal = true"> + Ajouter une candidature</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Ajouter un candidat</h3>
        <div>
          <label for="">Nom de l'entrepise</label>
          <input type="text" v-model="newPost.name" placeholder="Nom de l'entreprise" />
        </div>
        <div>
          <label for="">Description</label>
          <input type="text" v-model="newPost.description" placeholder="Description du poste" />
        </div>
        <div>
          <label for="">Date</label>
          <input type="date" v-model="dateString" />
        </div>
        <div>
          <label for="">Définir le statut</label>
          <select v-model="newPost.statut">
            <option value="envoye">Envoyée</option>
            <option value="entretien">Entretien</option>
            <option value="accepte">Acceptée</option>
            <option value="refuse">Refusée</option>
          </select>
        </div>

        <div class="option">
          <button @click="addPost">Ajouter</button>
          <button @click="showModal = false">Fermer</button>
        </div>

      </div>
    </div>
  </div>



  <CandidatCard v-for="post in filterPosts"
    :key="post.id"
    :post="post"
  />
</template>

<script setup lang="ts">
  import CandidatCard from '@/components/CandidatCard.vue';
  import type { Post } from '@/types/Post';
  import { computed, ref } from 'vue';
  import { useCandidatures } from '@/composables/useCandidatures';


  const { posts, addPost: addPostToStore } = useCandidatures()

  const search = ref("")
  const selectedOption = ref("Tous les statuts")
  const filterPosts = computed(()=>{
    if(selectedOption.value === "Tous les statuts"){
      if(search.value.trim()===""){
        return posts.value
      }else{
        return posts.value.filter(t => t.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
      }
    }
    else{
      if(search.value.trim()===""){
        return posts.value.filter(t => t.statut === selectedOption.value)
      }
      else{
        return posts.value.filter(t => t.statut === selectedOption.value).filter(t => t.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
      }

    }
  })

const showModal = ref(false)
const dateString = ref("")
const newPost = ref<Post>({
  id: Date.now(),
  name: "",
  description: "",
  creationDate: new Date(),
  statut: "envoye"
})



function addPost() {
  newPost.value.creationDate = new Date(dateString.value)
  addPostToStore(newPost.value)
  showModal.value = false
  newPost.value = {id: Date.now(), name: "", description: "", creationDate: new Date(), statut: "envoye"}
}




</script>

<style scoped>

  .option{
    margin: 10px;
    display: flex;
    justify-content: space-around;
    input{
      width: 45%;
      height: 1.2rem;
      font-size: 0.9em;
      padding: 4px;
      border-radius: 8px;
      border: 1px solid #5c5c5c5d;
    };
    select{
      width: 20%;
      font-size: 0.9rem;
      border-radius: 8px;
      border: 1px solid #5c5c5c5d;
    }
    button{
      font-size: 0.9rem;
      border-radius: 8px;
      border: 1px solid #5c5c5c5d;
    }
  }
  .modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    div{
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input{
        width: 300px;
        margin-left: 10px;
      }
      select{
        margin-right: 100px;
        width: 150px;
      }
    }
    .option{
      justify-content: space-evenly;
      button{
        width: 100px;
        height: 1.5rem;
      }
    }
  }
</style>
