import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './transport.reducer';
import { ITransport } from 'app/shared/model/transport.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TransportUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const transportEntity = useAppSelector(state => state.transport.entity);
  const loading = useAppSelector(state => state.transport.loading);
  const updating = useAppSelector(state => state.transport.updating);
  const updateSuccess = useAppSelector(state => state.transport.updateSuccess);
  const handleClose = () => {
    props.history.push('/transport' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...transportEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...transportEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="accountingImportExportProductsApp.transport.home.createOrEditLabel" data-cy="TransportCreateUpdateHeading">
            <Translate contentKey="accountingImportExportProductsApp.transport.home.createOrEditLabel">
              Create or edit a Transport
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="transport-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('accountingImportExportProductsApp.transport.brand')}
                id="transport-brand"
                name="brand"
                data-cy="brand"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                }}
              />
              <ValidatedField
                label={translate('accountingImportExportProductsApp.transport.model')}
                id="transport-model"
                name="model"
                data-cy="model"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                }}
              />
              <ValidatedField
                label={translate('accountingImportExportProductsApp.transport.vin')}
                id="transport-vin"
                name="vin"
                data-cy="vin"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 17, message: translate('entity.validation.minlength', { min: 17 }) },
                  maxLength: { value: 17, message: translate('entity.validation.maxlength', { max: 17 }) },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/transport" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TransportUpdate;
