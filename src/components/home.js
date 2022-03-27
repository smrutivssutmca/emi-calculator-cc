import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables, ArcElement } from 'chart.js';
Chart.register(...registerables);
Chart.register(ArcElement);

const currency = '₹';
const principalAmount = [
	{
		value: 0,
		label: '50000',
	},
	{
		value: 100,
		label: '4000000',
	},
];

const intrestRate = [
	{
		value: 0,
		label: '10.5',
	},
	{
		value: 100,
		label: '21',
	},
];

const timePeriod = [
	{
		value: 0,
		label: '1',
	},
	{
		value: 100,
		label: '5',
	},
];

function valueLabelFormat(value) {
	return `${value}`;
}

class Home extends Component {
	state = {
		pAmount: 50000,
		iRate: 10.5,
		iTime: 1,
		iAmount: 0,
		tAmount: 0,
		emi: 0,
	};

	handleChangeSliderPrincipalAmount = (event, value) => {
		console.log(value);
		this.setState({
			pAmount: value,
		});
	};

	handleChangeSliderIntrestRate = (event, value) => {
		this.setState({
			iRate: value,
		});
	};

	handleChangeSliderTime = (event, value) => {
		this.setState({
			iTime: value,
		});
	};

	handleChangePrincipalAmount = (event) => {
		console.log(event.target.value);
		this.setState({
			pAmount: event.target.value,
		});
	};

	handleChangeIntrestRate = (event) => {
		this.setState({
			iRate: event.target.value,
		});
	};

	handleChangeTime = (event) => {
		this.setState({
			iTime: event.target.value,
		});
	};

	handleCalculate = () => {
		const intr = this.state.iRate / 1200;
		const emi =
			(this.state.pAmount * intr * Math.pow(1 + intr, this.state.iTime * 12)) /
			(Math.pow(1 + intr, this.state.iTime * 12) - 1);
		const tAmount = this.state.iTime * 12 * emi;
		const iAmount = Math.round(tAmount - this.state.pAmount);
		this.setState({
			tAmount: tAmount,
			iAmount: iAmount,
			emi: Math.round(emi),
		});

		console.log(this.state);
	};

	render() {
		return (
			<Container fixed>
				<Box sx={{ width: '100%', maxWidth: 1100, margin: 'auto' }}>
					<Grid container spacing={1}>
						<Grid item xs>
							<Paper
								sx={{
									margin: 'auto',
									padding: '20px',
								}}
							>
								Amount you need {currency} &nbsp;&nbsp;
								<TextField
									id="standard-basic"
									variant="standard"
									onChange={this.handleChangePrincipalAmount}
									value={this.state.pAmount}
								/>
								<Container fixed>
									<Slider
										value={this.state.pAmount ?? 50000}
										aria-label="Princiapal Amount"
										defaultValue={10}
										min={50000}
										max={4000000}
										valueLabelDisplay="auto"
										onChange={this.handleChangeSliderPrincipalAmount}
										getAriaValueText={valueLabelFormat}
										principalAmount={principalAmount}
									/>
								</Container>
							</Paper>
						</Grid>
						<Grid item xs>
							<Paper
								sx={{
									margin: 'auto',
									padding: '20px',
								}}
							>
								For &nbsp;&nbsp;
								<TextField
									id="standard-basic"
									variant="standard"
									onChange={this.handleChangeTime}
									value={this.state.iTime}
								/>{' '}
								year
								<Container fixed>
									<Slider
										value={this.state.iTime ?? 1}
										aria-label="Time Period"
										min={1}
										max={5}
										valueLabelDisplay="auto"
										onChange={this.handleChangeSliderTime}
										getAriaValueText={valueLabelFormat}
										timePeriod={timePeriod}
									/>
								</Container>
							</Paper>
						</Grid>
						<Grid item xs>
							<Paper
								sx={{
									margin: 'auto',
									padding: '20px',
								}}
							>
								Interest rate &nbsp;&nbsp;
								<TextField
									id="standard-basic"
									variant="standard"
									onChange={this.handleChangeIntrestRate}
									value={this.state.iRate}
								/>{' '}
								%
								<Container fixed>
									<Slider
										value={this.state.iRate ?? 11}
										aria-label="Intrest Rate"
										step={0.01}
										min={10.5}
										max={21}
										valueLabelDisplay="auto"
										onChange={this.handleChangeSliderIntrestRate}
										getAriaValueText={valueLabelFormat}
										intrestRate={intrestRate}
									/>
								</Container>
							</Paper>
						</Grid>
					</Grid>
					<br />
					<Box sx={{ width: '100%', maxWidth: 500, float: 'right' }}>
						<Button
							variant="contained"
							color="primary"
							onClick={this.handleCalculate}
						>
							Calculate
						</Button>
					</Box>

					<br />
					<br />
					<Box sx={{ width: '100%', maxWidth: 500 }}>
						<Typography variant="h5" gutterBottom component="div">
							Your Monthly EMI will be{' '}
							<Typography variant="h2" gutterBottom component="div">
								{currency}
								{this.state.emi}
							</Typography>{' '}
							per month
						</Typography>
					</Box>
				</Box>
				<br />
				<Box sx={{ width: '200%', maxWidth: 400, margin: 'auto' }}>
					<Pie
						data={{
							labels: ['Principal Amount', 'Intrest Amount'],
							datasets: [
								{
									backgroundColor: ['#74c5e8', 'red'],
									data: [this.state.pAmount, this.state.iAmount],
								},
							],
						}}
						width={20}
						height={20}
					/>
				</Box>
			</Container>
		);
	}
}

export default Home;
