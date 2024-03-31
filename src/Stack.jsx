import styles from './Stack.module.css';


export default function Stack()
{
    return (
        <div className="stack">
            <StackItem image = './py-logo.png' text = 'Python'/>
        </div>
    );
}

function StackItem({image, text, extra})
{
  return (
    <div className='stack-item'>
      <img className= "stack-logo" src={image} alt='stack-item'/>
      <h3 className='description'>{text}</h3>
    </div>
  );
}