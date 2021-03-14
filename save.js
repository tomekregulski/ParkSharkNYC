var memories = JSON.parse(localStorage.getItem("memories"));

function handleSave(event) {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const value = Object.fromEntries(data.entries());

    console.log(value);

    memories.push(value);

    localStorage.setItem("memories", JSON.stringify(memories));

    console.log(memories);
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSave);