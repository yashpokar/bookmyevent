import React from 'react';
import Theme from './../components/Theme';
import Auth from './../utils/Auth';

import axios from 'axios';

export default class Book extends React.Component {
	state = {
		theaters: [],
		slotsByDate: [
			{
				date: '31',
				day: 'TODAY',
			},
			{
				date: '1',
				day: 'FRI',
			},
			{
				date: '2',
				day: 'SAT',
			},
			{
				date: '3',
				day: 'SUN',
			},
		],
		selectedDate: 0,
		showTicketsPickerModal: false,
		ticketsCanBePurchased: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		selectedTheater: null,
	}

	bookTicket (i) {
		this.setState({ selectedTheater: i, showTicketsPickerModal: true });
	}

	componentDidMount () {
		axios.get(`http://127.0.0.1:5000/theaters/has/movie/${this.props.match.params.slug}`, { params: { token: Auth.token() } })
		.then(({ data }) => {
			this.setState({ theaters: data.theaters });
		});
	}

	render () {
		return (
			<Theme>
				{
					this.state.showTicketsPickerModal ?
					<div className="tickets-picker-modal">
						<div className="tickets-picker-modal__content">
							<div className="tickets-picker-modal__close" onClick={ () => this.setState({ showTicketsPickerModal: false, selectedTheater: null }) }>&times;</div>

							<h2 className="tickets-picker-modal__title">How many tickets you want to buy?</h2>

							<ul className="tickets-picker-modal__tickets flex">
								{ this.state.ticketsCanBePurchased.map((numberOfSeats) => <li key={ numberOfSeats }>{ numberOfSeats }</li>) }
							</ul>
						</div>
					</div>
					: null
				}

				<ul className="slots-by-date flex">
					{
						this.state.slotsByDate.map((slotByDate, i) => (
							<li
								key={i}
								className={ this.state.selectedDate === i ? 'selected' : null }
								onClick={ () => this.setState({ selectedDate: i }) }
							>
								<div className="slots-by-date__date">{ slotByDate.date }</div>
								<div className="slots-by-date__day">{ slotByDate.day }</div>
							</li>
						))
					}
				</ul>

				<div className="theaters">
					{
						this.state.theaters.map((theater, i) => (
							<div className="theaters__item flex" key={i} onClick={ this.bookTicket.bind(this, i) }>
								<div className="theaters__item-name">{ theater.name }</div>

								<ul className="theaters__item-slots flex">
									{ theater.slots.map((slot, j) =>
										<li key={j}>
											<div className="theaters__item-slots__absolute">
												<ul className="theaters__item-slots__tooltip">
													<li className="theaters__item-slots__tooltip-item">
														<span className="theaters__item-slots__tooltip-item__price">Rs. 66.00</span>
														<span className="theaters__item-slots__tooltip-item__type">Silver</span>
														<span className="theaters__item-slots__tooltip-item__availability">Available</span>
													</li>
													<li className="theaters__item-slots__tooltip-item">
														<span className="theaters__item-slots__tooltip-item__price">Rs. 120.00</span>
														<span className="theaters__item-slots__tooltip-item__type">Gold</span>
														<span className="theaters__item-slots__tooltip-item__availability">Available</span>
													</li>
													<li className="theaters__item-slots__tooltip-item">
														<span className="theaters__item-slots__tooltip-item__price">Rs. 160.00</span>
														<span className="theaters__item-slots__tooltip-item__type">Platinum</span>
														<span className="theaters__item-slots__tooltip-item__availability">Available</span>
													</li>
												</ul>
											</div>

											{ slot }
										</li>
									) }
								</ul>
							</div>
						))
					}
				</div>
			</Theme>
		);
	}
}
