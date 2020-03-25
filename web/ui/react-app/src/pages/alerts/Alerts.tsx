import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useFetch } from '../../hooks/useFetch';
import { withStatusIndicator } from '../../components/withStatusIndicator';
import AlertsContent, { RuleStatus, AlertsProps } from './AlertContents';
import useGlobalVars from '../../hooks/useGlobalVars';

const AlertsWithStatusIndicator = withStatusIndicator(AlertsContent);

const Alerts: FC<RouteComponentProps> = () => {
  const { pathPrefix } = useGlobalVars();
  const { response, error, isLoading } = useFetch<AlertsProps>(`${pathPrefix}/api/v1/rules?type=alert`);

  const ruleStatsCount: RuleStatus<number> = {
    inactive: 0,
    pending: 0,
    firing: 0,
  };

  if (response.data && response.data.groups) {
    response.data.groups.forEach(el => el.rules.forEach(r => ruleStatsCount[r.state]++));
  }

  return <AlertsWithStatusIndicator statsCount={ruleStatsCount} {...response.data} error={error} isLoading={isLoading} />;
};

export default Alerts;
