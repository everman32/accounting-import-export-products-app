import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './export-prod.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ExportProdDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const exportProdEntity = useAppSelector(state => state.exportProd.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="exportProdDetailsHeading">
          <Translate contentKey="accountingImportExportProductsApp.exportProd.detail.title">ExportProd</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{exportProdEntity.id}</dd>
          <dt>
            <span id="departuredate">
              <Translate contentKey="accountingImportExportProductsApp.exportProd.departuredate">Departuredate</Translate>
            </span>
          </dt>
          <dd>
            {exportProdEntity.departuredate ? (
              <TextFormat value={exportProdEntity.departuredate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="accountingImportExportProductsApp.exportProd.trip">Trip</Translate>
          </dt>
          <dd>{exportProdEntity.trip ? exportProdEntity.trip.id : ''}</dd>
          <dt>
            <Translate contentKey="accountingImportExportProductsApp.exportProd.grade">Grade</Translate>
          </dt>
          <dd>{exportProdEntity.grade ? exportProdEntity.grade.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/export-prod" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/export-prod/${exportProdEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExportProdDetail;
