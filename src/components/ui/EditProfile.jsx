import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import ProfileCard from './ProfileCard'
import CommonSeciton from './CommonSection'
import Loader from './Loader'
import './edit-profile.css'


const EditProfile = ({ profile, setProfile, isPending }) => {


  const navigate = useNavigate()

  const onImageChange = (event) => {
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      profile.imgUrl = URL.createObjectURL(event.target.files[0])
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => { profile.img = Buffer(reader.result, 'base64') }
      profile.imgFormat = event.target.files[0].type
    }
  }

  const editProfile = async () => {
    try {
      const response = await fetch('/profile/edit', {
        method: 'post',
        body: JSON.stringify(profile),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json()
      navigate('/profile', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <CommonSeciton title='Create profile' />
    <Container>
      <Row>
        <Col lg='5' mb='4' ms='6'>
          <h5 className='mb-5 mt-3 text-light'>Preview Profile</h5>
          {isPending && <Loader />}
          {profile && <ProfileCard className='preview__card' profile={profile} isInCreation={true} />}
        </Col>
        <Col>
          <div className="create__profile">
            <form action="">
              <div className="form__input w-75">
                <label>Name</label>
                <input type="text" placeholder='Title' className='upload__input' onChange={input => profile.name = input.target.value} />
              </div>
              <div className="form__input w-75">
                <label>Picture</label>
                <input type="file" className='upload__input' onChange={onImageChange} />
              </div>
              <div className="form__input w-75">
                <label>Proficiency</label>
                <input type="text" placeholder='Proficiency' className='upload__input' onChange={input => profile.proficiency = input.target.value} />
              </div>
              <div className="form__input w-75">
                <label>Email</label>
                <input type="text" placeholder='Email' onChange={input => profile.email = input.target.value} />
              </div>
              <div className="form__input w-75">
                <label>Facebook</label>
                <input type="text" placeholder='Facebook' onChange={input => profile.facebook = input.target.value} />
              </div>
              <div className="form__input w-75">
                <label>Instagram</label>
                <input type="text" placeholder='Instagram' onChange={input => profile.instagram = input.target.value} />
              </div>
              <div className="form__input w-75">
                <label>Twitter</label>
                <input type="text" placeholder='Twitter' onChange={input => profile.twitter = input.target.value} />
              </div>

              <div className="form__input w-75 d-flex align-profiles-center justify-content-between">
                <div className="bid__btn">
                  <button type='button' className="btn d-flex align-profiles-center gap-2" onClick={() => {
                    let updatedProfile = profile
                    setProfile(profile => ({ ...profile, ...updatedProfile }))
                    window.scrollTo(0, 0)
                  }}>
                    <i className="ri-search-eye-line"></i>
                    Preview
                  </button>
                </div>
                <div className="bid__btn">
                  <button type='button' className="btn d-flex align-profiles-center gap-2" onClick={() => {
                    editProfile()
                  }}>
                    <i className="ri-building-3-line"></i>
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  </>
}

export default EditProfile