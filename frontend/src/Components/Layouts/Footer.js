import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './FH.css';

export default function App() {
  return (
    <MDBFooter className='text-center text-lg-start text-muted JsonFooter'>
      {/* <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        </div>
      </section> */}

      <section className='JsonFooter'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            {/* <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                JSONBrews
              </h6>
              <p>
                Mga Bading 
              </p>
            </MDBCol> */}

            <MDBCol md="6" lg="6" xl="6" className='mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-4'class='text-header-Json'>CREATORS</h6>
              <p class='text-Json'>Baluyot, Kayla Mae B.</p>
              <p class='text-Json'>Elumba, Bea Clarisse B.</p>
              <p class='text-Json'>Gracia, Arman Steven D.</p>
              <p class='text-Json'>Pagalan, Mary Angeleen</p>
            </MDBCol>

            <MDBCol md="3" lg="3" xl="3" className='mx-auto mb-md-0 mb-3'>
              <h6 className='text-uppercase fw-bold mb-4'class='text-header-Json'>CONTACT</h6>
              <p class='text-Json'>
                <MDBIcon icon="home" className="me-1" />
                Taguig City, Philippines
              </p>
              <p class='text-Json'>
                <MDBIcon icon="envelope" className="me-1" />
                jsonbrews@gmail.com
              </p>
              <p class='text-Json'>
                <MDBIcon icon="phone" className="me-1" />+6388899940
              </p>
              <p class='text-Json'>
                <MDBIcon icon="print" className="me-1" />+6399945678
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 JsonFooter' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a style={{ padding: '10px' }} className='JsonFooter' href=' '>
          JSONBrews.com
        </a>

      </div>
    </MDBFooter>
  );
}