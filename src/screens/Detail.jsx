import React from 'react';
import { Link } from 'react-router-dom';
import Theme from './../components/Theme';
import Auth from './../utils/Auth';

import axios from 'axios';

export default class Detail extends React.Component {
	state = {
		name: '',
		shortDescriptions: [],
		thumbnail: 'https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif',
		releaseDate: '',
		info: [],
	}

	componentDidMount () {
		axios.get(`http://127.0.0.1:5000/details/${this.props.match.params.slug}/${this.props.match.params.type}`, { params: { token: Auth.token() } })
			.then(({ data }) => {
				this.setState({ ...data.data });
			});
	}

	render () {
		const { name, info, shortDescriptions, thumbnail, releaseDate } = this.state;

		return (
			<Theme>
				<div className="detail-page">
					<div className="detail-page__absolute">
						<img
							src={ thumbnail }
							alt="Thumbnail"
							className="detail-page__thumbnail"/>

						<Link
							to={ `/book/slot/${this.props.match.params.slug}/${this.props.match.params.type}` }
							className="detail-page__book-button">
								Book Tickets
						</Link>

						<div className="detail-page__description">
							<div className="detail-page__description-content">
								<h3 className="detail-page__name">{ name }</h3>

								<ul className="detail-page__tags flex">
									{ shortDescriptions.map((tag, i) => <li key={i}>{ tag }</li>) }
								</ul>

								<div className="detail-page__release-date">
									Release Date: <span>{ releaseDate }</span>
								</div>

								<div className="detail-page__info">
									{ info.map((item, i) => <p key={i}>&nbsp;&nbsp;&nbsp;&nbsp; { item }</p>) }
								</div>
							</div>
						</div>
					</div>
				</div>
			</Theme>
		);
	}
}
