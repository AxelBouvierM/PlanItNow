import './App.css';
import React from 'react';
import { Parallax, Background } from 'react-parallax'
import { NavBar } from './components/header/NavBar';
import { SearchBar } from './components/body/searchBar/SearchBar';
import image1 from './images/montaña1.jpg'
import image2 from './images/montaña2.jpg'


const searchBarStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10rem',
  zIndex: '2'
};

const navBarStyles = {
  position: 'fixed',
  top: '1%',
  zIndex: '3'
};

const bgStyles = {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

function App() {
  return (
    <>
      <Parallax strength={500}>
        <Background className='customBg' bgImageStyle={bgStyles}>
          <img src={image1} alt='montaña' />
        </Background>
        <div className='bgDimensions' style={{ height: '100vh' }}>
          <div className='content'>
            <div className='navBar' style={navBarStyles}>
              <NavBar />
            </div>
            <div className='searchBar' style={searchBarStyles}>
              <SearchBar />
            </div>
          </div>
        </div>
      </Parallax>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet arcu ultricies, molestie turpis vel, semper urna. Ut elementum eu lacus id suscipit. Vestibulum eget leo eu ipsum ultricies facilisis ac non ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut a urna felis. Curabitur sit amet consequat tortor. Quisque id hendrerit erat, sed eleifend ligula. Suspendisse tincidunt in mi a dapibus.

        Sed placerat a ligula faucibus dignissim. Nulla ultrices porttitor aliquam. Praesent ut arcu at ante ornare finibus. Quisque non nisl vitae justo fringilla dictum nec eget enim. Vestibulum at orci non est mattis tincidunt sed vel libero. Suspendisse quis eros dignissim, condimentum tellus sit amet, aliquam purus. Mauris quis hendrerit magna. Ut a neque ut velit pretium vehicula. Nulla facilisi. In hac habitasse platea dictumst. Vestibulum mattis eleifend mauris, ac sollicitudin ipsum tristique sit amet. In iaculis dictum est, quis finibus nulla vestibulum sit amet. Sed fringilla nunc fringilla, fermentum elit semper, interdum quam.

        Duis et velit nec lorem tincidunt congue. Maecenas varius eu elit nec euismod. Vivamus tincidunt bibendum augue, vel consectetur nisl dictum eu. Phasellus sit amet ligula faucibus eros laoreet aliquam nec at sapien. Sed sit amet nunc nulla. Nunc a dapibus nunc. Nulla faucibus in risus id maximus. Curabitur sit amet diam odio.

        Nunc nec pharetra elit, id sagittis orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst. Mauris magna purus, luctus eget felis nec, ullamcorper ullamcorper metus. Sed at viverra enim, eget sollicitudin ante. Sed ipsum magna, tincidunt eu massa vulputate, eleifend commodo mauris. Quisque ac odio sed quam fermentum aliquet eget congue velit. Fusce urna libero, viverra vel volutpat a, egestas eget arcu. Curabitur at mi id nisl hendrerit auctor. Etiam aliquet tortor vitae quam bibendum vehicula. Ut commodo auctor volutpat. Vestibulum lectus lectus, facilisis sit amet ex non, molestie tempor tortor. Donec dictum ex eget mi dapibus, at ullamcorper leo lobortis.

        Sed a nunc in dolor consectetur vestibulum. Curabitur sed nulla quam. Vivamus ac iaculis ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin tempus interdum ullamcorper. Pellentesque accumsan molestie felis a ornare. Aenean congue est at enim suscipit, non lobortis felis mollis. Aliquam quis velit id magna vestibulum porta eu ut neque. Sed auctor augue turpis, vel condimentum nisl viverra non. Mauris at ligula a mi cursus vulputate. Nulla hendrerit sagittis nisi, sit amet blandit nunc lobortis gravida. Nulla facilisi. Fusce at aliquam tortor, in imperdiet enim. Integer aliquam massa et dictum porttitor.
      </p>
    </>
  );
}

export default App;
