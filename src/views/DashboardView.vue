<template>
  <main>
    <div class="top">
      <div>
        <p>Total de candidature</p>
        <span>{{ total }}</span>
      </div>
      <div>
        <p>Taux de réponse</p>
        <span>{{ reponse }}%</span>
      </div>
      <div>
        <p>Entretien à faire</p>
        <span>{{ entretien }}</span>
      </div>
    </div>

    <div class="board">
      <h1>Répartiton par statut</h1>
      <div>
        <div>
          <p>Envoyée</p>
          <p>{{ envoye }}</p>
        </div>
        <progress :value="envoye" :max="total" class="envoye"></progress>
      </div>
      <div>
        <div>
          <p>Entretien</p>
          <p>{{ entretien }}</p>
        </div>
        <progress :value="entretien" :max="total" class="entretien" ></progress>
      </div>
      <div>
        <div>
          <p>Acceptée</p>
          <p>{{ accepte }}</p>
        </div>
        <progress :value="accepte" :max="total" class="accepte"></progress>
      </div>
      <div>
        <div>
          <p>Refusée</p>
          <p>{{ refuse }}</p>
        </div>
        <progress :value="refuse" :max="total" class="refuse"></progress>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useCandidatures } from '@/composables/useCandidatures'
import { computed } from 'vue';


  const { posts } = useCandidatures()

  const total = computed(()=> posts.value.length)
  const envoye = computed(()=> posts.value.filter(t => t.statut === 'envoye').length)
  const entretien = computed(()=> posts.value.filter(t => t.statut === 'entretien').length)
  const accepte = computed(()=> posts.value.filter(t => t.statut === 'accepte').length)
  const refuse = computed(()=> posts.value.filter(t => t.statut === 'refuse').length)
  const reponse = computed(()=> ((total.value - envoye.value)/total.value)*100)

</script>

<style>
  .top{
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 30px 0;
  }
  .board{
    width: 80%;
    background-color: white;
    padding: 10px 40px 20px 40px;
    margin: 30px auto;
    border-radius: 12px;
    border: 1px solid #5c5c5c5d;
    div{
      margin-top: 20px;
      div{
        display: flex;
        justify-content: space-between;
      }
    }
  }
  progress {
    width: 100%;
    height: 10px;
    border-radius: 10px;
    overflow: hidden;
  }

  /* Chrome, Safari, Edge */
  progress::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 10px;
  }
  progress.envoye::-webkit-progress-value {
    background-color: #1e71ee;
    border-radius: 10px;
  }
  progress.entretien::-webkit-progress-value {
    background-color: #926b00;
    border-radius: 10px;
  }
  progress.accepte::-webkit-progress-value {
    background-color: #178b00;
    border-radius: 10px;
  }
  progress.refuse::-webkit-progress-value {
    background-color: #970000;
    border-radius: 10px;
  }
  p{
    margin: 0;
  }
</style>
