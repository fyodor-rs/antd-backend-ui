import React from 'react';
import { Card, Row, Col } from 'antd';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import Highcharts from '@/components/HomePage/highCharts';
import { PieEcharts } from '@/components/HomePage/Echarts';
import Statistic from '@/components/HomePage/Statistic';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Statistic></Statistic>
        <div>今日统计</div>
        <Card bodyStyle={{ padding: 14 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card bodyStyle={{ padding: 14 }}>
                <PieEcharts id={1}></PieEcharts>
              </Card>
            </Col>
            <Col span={6}>
              <Card bodyStyle={{ padding: 14 }}>
                <PieEcharts id={2}></PieEcharts>
              </Card>
            </Col>
            <Col span={6}>
              <Card bodyStyle={{ padding: 14 }}>
                <PieEcharts id={3}></PieEcharts>
              </Card>
            </Col>
            <Col span={6}>
              <Card bodyStyle={{ padding: 14 }}>
                <PieEcharts id={4}></PieEcharts>
              </Card>
            </Col>
          </Row>
          <Card style={{ marginTop: 14 }}>
            <Highcharts></Highcharts>
          </Card>
        </Card>
      </div>
    );
  }
}

export default Home;
