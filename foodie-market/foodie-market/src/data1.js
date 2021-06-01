

const type = [
    { _id: 1, name: "meat" },
    { _id: 2, name: "fish" }

]

export const get_type = () => {
    return type.map(t => t)
}