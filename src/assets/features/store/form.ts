import {createStore, createEvent} from "effector"

// все возможные значения
export const $allPriorities = createStore<string[]>(["low", "medium", "high"])
export const $allTags = createStore<string[]>(["Bug", "Feature", "Docs", "Test", "Refactor"])
// все изменяемые значения карточки 
export const $title = createStore<string>("")
export const $description = createStore<string>("")
export const $priority = createStore<string>("")
export const $tag = createStore<string>("")
export const $status = createStore<string>("")

// события
export const changeTitle = createEvent<string>()
export const changeDescription = createEvent<string>()
export const changePriority = createEvent<string>()
export const changeTag = createEvent<string>()
export const changeStatus = createEvent<string>()

// cвязка сторов и ивентов
$title.on(changeTitle, (prev, newTitle:string) => newTitle)
$description.on(changeDescription, (prev, newDescription) => newDescription)
$priority.on(changePriority, (prev, newPriority) => newPriority)
$tag.on(changeTag, (prev, newTag) => newTag)
$status.on(changeStatus, (prev, newStatus) => newStatus)

