import React, { Component } from 'react';

class TestBase extends Component {
    resetInterval(){
        // clearInterval(test);
        this.props.navigation.setParams({test: '654321'});
        console.log('delete interval');
      }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default TestBase;