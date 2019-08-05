import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { Grid, Text, Input } from 'indigo-react';
import * as azimuth from 'azimuth-js';

import { useNetwork } from 'store/network';
import { usePointCache } from 'store/pointCache';

import * as need from 'lib/need';
import useEthereumTransaction from 'lib/useEthereumTransaction';
import { GAS_LIMITS } from 'lib/constants';
import patp2dec from 'lib/patp2dec';
import { isZeroAddress } from 'lib/wallet';
import { useLocalRouter } from 'lib/LocalRouter';

import ViewHeader from 'components/ViewHeader';
import InlineEthereumTransaction from 'components/InlineEthereumTransaction';
import View from 'components/View';
import BridgeForm from 'form/BridgeForm';
import {
  PointInput,
  composeValidator,
  buildPointValidator,
  buildAddressValidator,
} from 'form/Inputs';
import FormError from 'form/FormError';

function useCreateGalaxy() {
  const { contracts } = useNetwork();
  const { syncKnownPoint } = usePointCache();

  const _contracts = need.contracts(contracts);

  const [galaxy, setGalaxy] = useState();

  return useEthereumTransaction(
    useCallback(
      (galaxy, owner) => {
        setGalaxy(galaxy);
        return azimuth.ecliptic.createGalaxy(_contracts, galaxy, owner);
      },
      [_contracts]
    ),
    useCallback(() => syncKnownPoint(galaxy), [galaxy, syncKnownPoint]),
    GAS_LIMITS.DEFAULT
  );
}

export default function CreateGalaxy() {
  const { pop } = useLocalRouter();
  const { contracts } = useNetwork();
  const _contracts = need.contracts(contracts);

  const {
    construct,
    unconstruct,
    completed,
    inputsLocked,
    bind,
  } = useCreateGalaxy();

  const validateGalaxy = useCallback(
    async galaxyName => {
      const currentOwner = await azimuth.azimuth.getOwner(
        _contracts,
        patp2dec(galaxyName)
      );

      const isAvailable = isZeroAddress(currentOwner);
      if (!isAvailable) {
        return 'This galaxy is already spawned and owned.';
      }
    },
    [_contracts]
  );

  const validate = useMemo(
    () =>
      composeValidator({
        galaxyName: buildPointValidator(1, validateGalaxy),
        owner: buildAddressValidator(),
      }),
    [validateGalaxy]
  );

  const onValues = useCallback(
    ({ valid, values }) => {
      if (valid) {
        construct(patp2dec(values.galaxyName), values.owner);
      } else {
        unconstruct();
      }
    },
    [construct, unconstruct]
  );

  return (
    <View pop={pop} inset>
      <Grid>
        <Grid.Item full as={ViewHeader}>
          Create a Galaxy
        </Grid.Item>

        <BridgeForm validate={validate} onSubmit={() => {}} onValues={onValues}>
          {({ handleSubmit, values }) => (
            <>
              {completed && (
                <Grid.Item
                  full
                  as={Text}
                  className={cn('f5', {
                    green3: completed,
                  })}>
                  {values.galaxyName} has been created and can be claimed by{' '}
                  {values.owner}.
                </Grid.Item>
              )}

              <Grid.Item
                full
                as={PointInput}
                className="mt4"
                name="galaxyName"
                label="Galaxy Name"
                disabled={inputsLocked}
              />
              <Grid.Item
                full
                as={Input}
                className="mb4"
                name="owner"
                label="Ethereum Address"
                disabled={inputsLocked}
              />

              <Grid.Item full as={FormError} />

              <Grid.Item
                full
                as={InlineEthereumTransaction}
                {...bind}
                onReturn={() => pop()}
              />
            </>
          )}
        </BridgeForm>
      </Grid>
    </View>
  );
}
