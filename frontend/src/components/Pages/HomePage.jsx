// src/components/hero/HomePage.js

import Mentor from '../hero/Hero';
import About from '../hero/About';
import Feature from '../hero/Feature';
import Try from '../hero/Try';
import Job from '../hero/Job';
import Faq from '../hero/Faq'; 
import Value from '../hero/value'
import Newsletter from '../hero/Newsletter';

const HomePage = () => {
    return (
        <div>
            <Mentor />
            <About />
            <Feature/>
            <Job/>
            <Value/>
            <Faq/>
            <Try/> 
            <Newsletter/>
        </div>
    );
};

export default HomePage;
