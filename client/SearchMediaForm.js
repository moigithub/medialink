import React,{Component} from 'react';

export default class SearchMediaForm extends Component {
render(){    
    return (
        <form className="form-inline pull-xs-right" id="searchForm">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="... Search Media"/>
              <button type="submit" className="btn btn-outline-success">Submit</button>
            </div>
        </form>
        );
    }
}
                      