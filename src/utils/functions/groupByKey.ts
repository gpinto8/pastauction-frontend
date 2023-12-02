export const groupByKey = (array: any, key: string) => {
  if (array?.length) {
    const groups = array.reduce((groups: any, el: any) => {
      if (!groups[el[key]]) {
        groups[el[key]] = []
      }
      groups[el[key]].push(el)
      return groups
    }, {})

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map(start_date => {
      return {
        start_date,
        items: groups[start_date]
      }
    })
    return groupArrays
  } else return []
}
