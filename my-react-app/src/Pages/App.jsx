

import './App.css';
import './Tracker.css';
import H1text from '../component/H1text';
import Textcard1 from '../component/Textcard1';
import Textcard2 from '../component/Textcard2';
import Bodies1 from '../component/Bodies1';
import Footer from '../component/Footer';
import Review from '../component/Review';







function App() {
  return (
    <>
  
<div className="bodi"> 
    <H1text/>
</div>
<div className="texts"   >
<Textcard1/>
<Textcard2/>
</div> 

<Bodies1/>
<Review/>
<Footer/>     
      
     
      
    </>
  );
}

export default App;
