import { Link } from 'react-router-dom';
import React from 'react';

import axios from 'axios';

import Auth from './../utils/Auth';

export default class Theme extends React.Component {
	state = {
		showAuthModal: false,
		showSignUpPage: false,
		showAuthButton: true,
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		phone: '',
		confirm_password: '',
		isUserLoggedIn: false,
	}

	submitForm (e) {
		const { first_name, last_name, email, password, confirm_password, phone } = this.state;

		e.preventDefault();

		const url = 'http://127.0.0.1:5000/' + (this.state.showSignUpPage === true ? 'register' : 'login');

		fetch(url, {
			method: 'POST',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ first_name, last_name, email, password, confirm_password, phone }),
		})
			.then((response) => {
				if (response.status === 422) {
					return;
				}

				response.json()
					.then(data => {
						if (this.state.showSignUpPage === true) {
							this.setState({ showAuthModal: false });
						} else {
							localStorage.setItem('token', data.token);

							this.setState({ showAuthButton: false });
						}
					});
			});
	}

	componentDidMount () {
		const token = Auth.token();

		this.setState({ isUserLoggedIn: Auth.isLoggedIn() }, () => {
			if (this.state.isUserLoggedIn) {
				axios.defaults.params = { token };
			}
		});
	}

	render () {
		const { first_name, last_name, email, phone, password, confirm_password } = this.state;

		return (
			<div className="container">
				{
					this.state.showAuthModal ?
					<div className="auth-modal flex">
						<form onSubmit={ this.submitForm.bind(this) } className="auth-modal__form flex">
							<div onClick={ () => this.setState({ showAuthModal: false }) } className="auth-modal__close">&times;</div>

							<h2 className="auth-modal__title">Sign { ! this.state.showSignUpPage ? 'In' : 'Up' }</h2>

							{
								this.state.showSignUpPage ?
									<>
										<div className="auth-modal__input flex">
											<label>First name</label>
											<input type="text" className="auth-modal__input-box" onChange={ e => this.setState({ first_name: e.target.value }) } value={ first_name } autoComplete="false" />
										</div>

										<div className="auth-modal__input flex">
											<label>Last name</label>
											<input type="text" className="auth-modal__input-box" onChange={ e => this.setState({ last_name: e.target.value }) } value={ last_name } autoComplete="false" />
										</div>

										<div className="auth-modal__input flex">
											<label>Phone</label>
											<input type="text" className="auth-modal__input-box" onChange={ e => this.setState({ phone: e.target.value }) } value={ phone } autoComplete="false" />
										</div>
									</>
								: null
							}

							<div className="auth-modal__input flex">
								<label htmlFor="email">Email address</label>
								<input type="email" className="auth-modal__input-box" onChange={ e => this.setState({ email: e.target.value }) } value={ email } autoComplete="false" />
							</div>

							<div className="auth-modal__input flex">
								<label htmlFor="password">Password</label>
								<input type="password" className="auth-modal__input-box" onChange={ e => this.setState({ password: e.target.value }) } value={ password } autoComplete="false" />
							</div>

							{
								! this.state.showSignUpPage ?
								<>
									<div className="auth-modal__input">
										<button type="submit" className="auth-modal__input-submit">Log In</button>
									</div>

									<div className="auth-modal__input">
										<button type="button" className="auth-modal__input-button" onClick={ () => this.setState({ showSignUpPage: true }) }>Create new Account</button>
									</div>
								</>
								:
								<React.Fragment>

									<div className="auth-modal__input flex">
										<label htmlFor="confirm_password">Confirm password</label>
										<input type="password" className="auth-modal__input-box" onChange={ e => this.setState({ confirm_password: e.target.value }) } value={ confirm_password } autoComplete="false" />
									</div>

									<div className="auth-modal__input">
										<button type="submit" className="auth-modal__input-submit">Register</button>
									</div>

									<div className="auth-modal__input">
										<button type="button" className="auth-modal__input-button" onClick={ () => this.setState({ showSignUpPage: false }) }>Log In</button>
									</div>
								</React.Fragment>
							}

						</form>
					</div>
					: null
				}

				<nav className="navigation flex">
					<Link to="/" className="navigation__logo">BookMyEvent</Link>

					<div className="navigation__search">
						<input
							type="text"
							className="navigation__search-box"
							placeholder="Search for movies, events, sports and activities..." />
					</div>

					{
						! this.state.isUserLoggedIn ?
							<div className="navigation__signin-button flex">
								<button onClick={ () => this.setState({ showAuthModal: true }) }>Sign In</button>
							</div>
						:
						<div className="navigation__user flex">
							<span className="navigation__user-name">Yash Pokar</span>
						</div>
					}
				</nav>

				<ul className="navigation-secondary flex">
					<li className="navigation-secondary__item">
						<Link to="/">Movies</Link>
					</li>

					<li className="navigation-secondary__item">
						<Link to="/">Events</Link>
					</li>

					<li className="navigation-secondary__item">
						<Link to="/">Sports</Link>
					</li>

					<li className="navigation-secondary__item">
						<Link to="/">Activities</Link>
					</li>
				</ul>

				{ this.props.children }

				<footer className="footer">
					<p>&copy; 2019. All the rights reserved.</p>
				</footer>
			</div>
		);
	}
}
