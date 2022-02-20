import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline"
import axios from "axios"
import { useForm, useFieldArray } from "react-hook-form"
import { mutate } from "swr"
import { Modal } from "../../layout/Modal"

function CreateStrawpoll({ setIsOpen, isOpen }) {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        poll: {
          title: "Ranking da Semana",
          priv: "false",
          answers: [{ name: "kng" }],
        },
      },
    }
  )
  const { fields, append, remove } = useFieldArray({
    control,
    name: "poll.answers",
  })

  const createPoll = async (data) => {
    const answersArray = data.poll.answers.map((answer) => answer.name)
    const pollAnswers = data
    pollAnswers.poll.answers = answersArray

    try {
      const resp = await axios.post(
        "http://localhost:3000/api/admin/strawpoll",
        { data: pollAnswers }
      )
      mutate("/api/admin/strawpoll/")

      setIsOpen(false)

      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="card mx-auto w-full bg-drac_bg text-white">
        <div className="card-body text-center">
          <div className="card-title ">Criar nova votação no Strawpoll</div>

          <form onSubmit={handleSubmit(createPoll)} className="flex flex-col">
            <label htmlFor="title" className="label">
              Título da Votação
            </label>
            <input
              {...register("poll.title")}
              className="input-bordered input text-black"
            />
            <label htmlFor="week" className="label">
              Semana da Votação
            </label>
            <input
              type="number"
              min="0"
              {...register("poll.week")}
              className="input-bordered input text-black"
            />
            <ul>
              <label htmlFor="title" className="label">
                Jogadores
              </label>
              {fields.map((item, index) => (
                <li key={item.id} className="mb-4">
                  <div className="flex flex-shrink justify-between">
                    <input
                      {...register(`poll.answers.${index}.name`)}
                      className="input-bordered input w-full text-black"
                    />
                    <button type="button" onClick={() => remove(index)}>
                      <TrashIcon className="ml-4 h-6 w-6 transition-colors hover:text-accent" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => append({ name: "" })}>
              <PlusCircleIcon className="h-6 w-6 transition-colors hover:text-green-400" />
            </button>
            <input type="submit" className="btn mx-auto w-1/3 bg-accent " />
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default CreateStrawpoll
