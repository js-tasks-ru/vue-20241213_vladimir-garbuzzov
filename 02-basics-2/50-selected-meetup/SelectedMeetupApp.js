import { defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const currentMeetupId = ref(1)
    const currentMeetup = ref(null)

    const loadMeetup = async () => {
      currentMeetup.value = await getMeetup(currentMeetupId.value)
    }

    const nextMeetup = () => {
      currentMeetupId.value++
    }

    const prevMeetup = () => {
      currentMeetupId.value--
    }

    onMounted( async () => {
     await loadMeetup()
    })

    watch(currentMeetupId, async () => {
      await loadMeetup()
    })

    return {
      currentMeetupId,
      currentMeetup,
      nextMeetup,
      prevMeetup
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" @click.prevent="prevMeetup" :disabled="currentMeetupId === 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="currentMeetupId"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="currentMeetupId"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="currentMeetupId"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="currentMeetupId"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="currentMeetupId"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" @click.prevent="nextMeetup" :disabled="currentMeetupId >= 5">Следующий</button>
      </div>

      <div v-if="currentMeetup">
        <div class="meetup-selector__cover">
          <div class="meetup-cover">
            <h1 class="meetup-cover__title">{{ currentMeetup.title }}</h1>
          </div>
        </div>
      </div>


    </div>
  `,
})
