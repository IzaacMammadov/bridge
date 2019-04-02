import React from 'react'
import { Row, Col, H1, H3, P, Warning, Anchor } from '../components/Base'
import { Button } from '../components/Base'

import { ROUTE_NAMES } from '../lib/router'
import { BRIDGE_ERROR, renderTxnError } from '../lib/error'
import { NETWORK_NAMES } from '../lib/network'

const Success = (props) => {

  const esvisible =
      props.networkType === NETWORK_NAMES.ROPSTEN ||
      props.networkType === NETWORK_NAMES.MAINNET

  const esdomain =
      props.networkType === NETWORK_NAMES.ROPSTEN
    ? "ropsten.etherscan.io"
    : "etherscan.io"

  const esmessage =
      esvisible === true
    ? "If you’d like to keep track of it, click the Etherscan link below."
    : ''

  const esanchor =
      esvisible === false
    ? <div />
    : <Anchor
        className={'mb-4 mt-1'}
        prop-size={'sm'}
        target={'_blank'}
        href={`https://${esdomain}/tx/${props.hash}`}>
          {'View on Etherscan ↗'}
      </Anchor>

  return (
    <Row>
      <Col>
        <H1>{ 'Your Transaction was Sent' }</H1>

        <P>
          {
            `We sent your transaction to the chain. It can take some time to
            execute, especially if the network is busy. ${esmessage}`
          }
        </P>

        <H3>{ 'Transaction Hash' }</H3>
        <P>
          { props.hash }
        </P>

        { esanchor }

      </Col>
    </Row>
  )
}

const Failure = (props) =>

    <Row>
      <Col>
        <H1>{ 'Error!' }</H1>


        <Warning>
          <H3>
            {
              'There was an error sending your transaction.'
            }
          </H3>
          { renderTxnError(props.web3, props.message) }
        </Warning>
      </Col>
    </Row>

const SentTransaction = (props) => {
  const { web3, txnHashCursor, networkType, popRoute, pushRoute } = props
  const { setPointCursor, pointCursor } = props

  const promptKeyfile = props.routeData && props.routeData.promptKeyfile

  const w3 = web3.matchWith({
    Nothing: _ => { throw BRIDGE_ERROR.MISSING_WEB3 },
    Just: res => res.value
  })

  const result = txnHashCursor.matchWith({
    Nothing: _ => { throw BRIDGE_ERROR.MISSING_TXN },
    Just: res => res.value
  })

  const body = result.matchWith({
    Error: message => <Failure web3={ w3 } message={ message.value } />,
    Ok: hash =>
      <Success
        hash={ hash.value }
        networkType={ networkType }
      />
  })

  const ok =
    <Row>
      <Col>
        <Button
          prop-type={'link'}
          onClick={
            () => {
              setPointCursor(pointCursor)
              popRoute()
            }
          }>
          { 'Ok →' }
        </Button>
      </Col>
    </Row>

  let keyfile;

  if (promptKeyfile) {
    keyfile = (
      <Row>
        <Col>
          <Button
            prop-type={'link'}
            onClick={
              () => {
                popRoute()
                pushRoute(ROUTE_NAMES.GEN_KEYFILE)
              }
            }>
            { 'Download Keyfile →' }
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      { body }
      { ok }
      { keyfile }
    </div>
  )
}

export default SentTransaction
