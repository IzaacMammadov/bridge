import Maybe from 'folktale/maybe'
import React from 'react'
import { Button } from '../components/Base'
import { RequiredInput, InnerLabel, InputCaption } from '../components/Base'
import { Row, Col, H1 } from '../components/Base'

import { ROUTE_NAMES } from '../lib/router'
import { EthereumWallet } from '../lib/wallet'

const secre = /[0-9A-Fa-f]{64}/g

class PrivateKey extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      privateKey: '',
    }

    this.handlePrivateKeyInput = this.handlePrivateKeyInput.bind(this)
  }

  handlePrivateKeyInput(privateKey) {
    this.setState({ privateKey })
    this.constructWallet(privateKey)
  }

  constructWallet(privateKey) {
    const { setWallet } = this.props
    if (secre.test(privateKey) === true) {
      const sec = Buffer.from(privateKey, 'hex')
      const wallet = new EthereumWallet(sec)
      setWallet(Maybe.Just(wallet))
    } else {
      setWallet(Maybe.Nothing())
    }
  }

  render() {
    const { pushRoute, popRoute, wallet } = this.props
    const { privateKey } = this.state

    return (
        <Row>
          <Col className={'measure-md'}>
            <H1 className={'mb-4'}>{ 'Enter Your Private Key' }</H1>
            <InputCaption>
            { `Please enter your raw Ethereum private key here.` }
            </InputCaption>

            <RequiredInput
              className='pt-8 mt-8'
              prop-size='md'
              prop-format='innerLabel'
              type='password'
              name='privateKey'
              onChange={ this.handlePrivateKeyInput }
              value={ privateKey }
              autocomplete='off'
              autoFocus>
              <InnerLabel>{'Private Key'}</InnerLabel>
            </RequiredInput>

            <Button
              className={'mt-10'}
              prop-size={ 'wide lg' }
              disabled={ Maybe.Nothing.hasInstance(wallet) }
              onClick={ () => {
                  popRoute()
                  pushRoute(ROUTE_NAMES.SHIPS)
                }
              }
            >
              { 'Continue →' }
            </Button>
          </Col>
        </Row>


    )
  }
}

export default PrivateKey
