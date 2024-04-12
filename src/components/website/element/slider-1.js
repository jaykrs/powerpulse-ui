import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CityList from '../../../city.json';
import RegionList from '../../../regoin.json';

const Slider1 = (props) => {
	const City = CityList;
	const Region = RegionList;
	let history = useHistory();
	// localStorage.setItem()
	const [randomstring, setrandomstring] = useState();
	const [sur, setSur] = useState(false);
	const [sup, setSup] = useState(false);
	const [des, setDes] = useState(false);
	const [ishidden, setIshidden] = useState(false)
	const [country, setcountry] = useState()
	const [city, setcity] = useState()
	const [pricequote, setpricequote] = useState({
		deviceid: "",
		projecttype: "",
		city: "",
		country: "",
		lattitude: "15.422",
		longitude: "-30.766",
		servicetype: "",
		sitearea: "",
		floorplan: "",
		locale: "en"
	})

	const handleChange = (type, value) => {
		var data = { ...pricequote }
		data[type] = value
		setpricequote(data)
	}

	const handleProjectType = (e) => {
		console.log("e", e)
		if (e === "res" || e === "com") {
			setpricequote({
				...pricequote,
				projecttype: e
			})
			setIshidden(false)
		} else {
			setpricequote({
				...pricequote,
				projecttype: e
			})
			setIshidden(true)
		}
	}


	const handleSubmit = (e) => {
		var randomstring = '';
		var characters = 'adseerrttryryhghAdraaSADRE123455FDSrs'
		for (var i, i = 0; i < characters.length; i++) {
			randomstring += characters.charAt(Math.floor(Math.random() * characters.length))
		}
		var priceData = { ...pricequote }
		priceData.deviceid = randomstring;
		var serviceType = []
		if (sur) {
			serviceType.push("sur")
		}
		if (sup) {
			serviceType.push("sup")
		}
		if (des) {
			serviceType.push("des")
		} else {
			serviceType.push("lic")
		}

		priceData.servicetype = serviceType.join()
		setpricequote(priceData)
		var data = JSON.stringify(priceData)
		sessionStorage.setItem('priceData', data)
		// console.log(pricequote.projecttype,pricequote.floorplan, 'datalist')
		console.log(priceData)

		history.push({
			pathname: '/efirmlist',
			// state: response.data
		})
	};

	return (
		<>
			{/* style={{backgroundImage:`url(${FormBack})`}} */}
			{/* <div className="banner-one" > */}
			<div className="container">
				<div className="banner-inner" >
					<div className="img1"><img src={"../images/main-slider/slider1/pic3.png"} alt="" /></div>
					<div className="img2"><img src="..images/main-slider/slider1/pic4.png" alt="" /></div>
					<div className="row align-items-center">
						<div className="col-md-6">
							{/* <div className="banner-content">
								<h6 data-wow-duration="1s" data-wow-delay="0.5s" className="wow fadeInUp sub-title text-primary">المهندس</h6>

							</div> */}
						</div>
						<div className="col-md-6 hidemenu-imageus">
							<div class="card-body bg-white">
								<h4 class="searchText"><strong>Project Type</strong></h4>
								<div class="row mt-5">
									<div class="col-sm-6">
										<select class="browser-default custom-select  mb-4" id="select"
											value={pricequote.projecttype}
											onChange={(e) => handleProjectType(e.target.value)} >
											<option value="" disabled="" selected="">Project Type</option>
											<option value="res" >Resendential</option>
											<option value="com" >Commercial</option>
											<option value="lic" >License</option>
										</select>
									</div>

									<div class="col-sm-6">
										<select class="browser-default custom-select mb-4" id="select"
											value={pricequote.country}
											onChange={(e) =>
												setpricequote({
													...pricequote,
													country: e.target.value,
												})
											}>
											<option value="" disabled="" selected="">Country</option>
											<option value="sa">Saudi Arabia</option>
										</select>
									</div>
								</div>



								<div class="row">
									<div class="col-sm-6">
										<select class="browser-default custom-select mb-4" id="select"
											required
											value={pricequote.city}
											onChange={(e) =>
												// handleChange('city', e.target.value)
												setpricequote({
													...pricequote,
													city: e.target.value
												})
											}>
											<option value="" disabled="" selected="">City</option>
											{City.map((item, index) => {
												return (
													<option value={item.code}>{item.name_en}</option>
												)
											})}

										</select>
									</div>
									<div class="col-sm-6">
										<select class="browser-default custom-select mb-4" id="select"
											value={pricequote.floorplan}
											onChange={(e) =>
												setpricequote({
													...pricequote,
													floorplan: e.target.value,
												})
											}>
											<option value="" disabled="" selected="">Floor Plan</option>
											<option value="1to7">1st to 7th</option>
											<option value="8to15">8th to 15th</option>
											<option value="15plus">15th+</option>
										</select>
									</div>


								</div>

								<div class="row mt-2">

									<div class="col-sm-6">
										<input placeholder="&#xf073; Area in Sq/m" type="text" id="date-picker-example" class="form-control datepicker"
											// value={pricequote.sitearea}
											onChange={(e) =>
												setpricequote({
													...pricequote,
													sitearea: e.target.value,
												})
											} />
									</div>
									<div class="row mb-3 mt-2" hidden={ishidden} >

										<label class="radiobtn px-2 m-l-10">
											<input type="checkbox" name="gender" checked={sur} onChange={(e) => { setSur(!sur) }} required />
											<text className='slider_text_color'>Survey</text>
										</label>
										<label class="radiobtn px-2">
											<input type="checkbox" name="gender" checked={sup} onChange={(e) => { setSup(!sup) }} />
											<text className='slider_text_color'>Supervision</text>
										</label>
										<label class="radiobtn px-2">
											<input type="checkbox" name="gender" checked={des} onChange={(e) => { setDes(!des) }} />
											<text className='slider_text_color'>Design</text>
										</label>

									</div>

								</div>

								<text onClick={() => handleSubmit('e')} class="btn btn-primary float-right ">Next</text>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	)
}

export default Slider1;