import { Link } from 'react-router-dom';
import React from 'react';
import Theme from './../components/Theme';
import Auth from './../utils/Auth';

import axios from 'axios';

export default class Home extends React.Component {
	state = {
		items : [],
	}

	componentDidMount () {
		axios.get('http://127.0.0.1:5000/listing', { params: { type: 'movie', token: Auth.token() } })
			.then(({ data }) => {
				this.setState({ items: data.items });
			});
	}

	render () {
		return (
			<Theme>
				<div className="events">
					{
						this.state.items.map((item, i) => (
							<Link to={ `/book/${item.slug}/movie` } className="event-item" key={i}>
								<img src={ item.thumbnail }
									alt={ item.name }
									className="event-item__image"
								/>

								<div className="event-item__name">{ item.name }</div>

								<ul className="event-item__short-description">
									{ item.shortDescriptions.map((shortDescription, j) => <li key={j}>{ shortDescription }</li>) }
								</ul>
							</Link>
						))
					}
				</div>
			</Theme>
		);
	}
}
