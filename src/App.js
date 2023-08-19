import SingleCard from './Components/SingleCard';
import './App.css';
import {useEffect, useState} from 'react'

const cardImages = [ 
{ "src": "/img/helmet-1.png", matched:false },
{ "src": "/img/potion-1.png", matched:false },
{ "src": "/img/ring-1.png", matched:false },
{ "src": "/img/scroll-1.png", matched:false },
{ "src": "/img/shield-1.png", matched:false },
{ "src": "/img/sword-1.png", matched:false },
]


function App() {
  


  const[cards,setCards] = useState([])
  const[turns,setTurns] = useState(0)
  const[choiceOne,setChoiceOne] = useState(null)
  const[choiceTwo,setChoiceTwo] = useState(null)
  const[disabled,setDisabled] = useState(false)

  //Creating a function which does 3 jobs, 1st being it will be duplicating the cards, 2nd randomizing the array, 3rd was random id for card


  //Shuffle Cards

  const shuffleCards = () =>{
      const shuffledCards=[...cardImages,...cardImages]
      .sort(()=>Math.random()-0.5)
      .map((card)=>({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  //start a game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  //handle a choice
  const handleChoice=(card)=>{
      
      

       choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
    
      useEffect(()=>{
       
        if(choiceOne && choiceTwo)
        {
          setDisabled(true)
         if(choiceOne.src === choiceTwo.src)
         {
                setCards(prevCards=>{
                  return prevCards.map(card =>{
                    if(card.src === choiceOne.src)
                    {
                      return {...card, matched: true}
                    }
                    else
                    {
                      return card
                    }
                  })
                })
                resetTurn()
               
         }
   
         else
         {
               
            setTimeout(()=>resetTurn(),1000)
             
         }
       
        }
        },[choiceOne,choiceTwo])
      
    
       
       console.log(cards)
  

  const resetTurn = (card)=> {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1> Magic Match </h1>
      <button onClick={shuffleCards}> New  Game</button>


      <div className="card-grid">
        {cards.map(card =>(
          
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            disabled = {disabled}
            flipped={ card === choiceOne || card === choiceTwo || card.matched}
             />
  
            
        
        ))}
      </div>
      <p> Turns : {turns}</p>
    </div>
  );
}

export default App;
