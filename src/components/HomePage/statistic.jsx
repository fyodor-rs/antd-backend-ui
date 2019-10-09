import React, { Component } from 'react';
import { Statistic, Row, Col, Button,Card } from 'antd';
class StatisticDemo extends Component {

    render(){
        return(
            <Row gutter={16}>
            <Col span={6}>
            <Card>
                <Statistic title="今日文章阅读" value={112893} />
            </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="全站文章数" value={112893}  />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="全站标签数" value={112893} />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="全站评论数" value={112893}  />
                </Card>
            </Col>
          </Row>
        )
    }
}

export default StatisticDemo