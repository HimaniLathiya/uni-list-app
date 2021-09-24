export const getAllUniversity = async () => {

    return await fetch(`http://universities.hipolabs.com/search?country=`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}