import React from 'react';
import { Card, Row, Col, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Highcharts from '@/components/HomePage/highCharts';
import  {PieEcharts,LineEcharts} from '@/components/HomePage/Echarts';
import Statistic from '@/components/HomePage/Statistic';
// const CodePreview = ({ children }) => (
//   <pre
//     style={{
//       background: '#f2f4f5',
//       padding: '12px 20px',
//       margin: '12px 0',
//     }}
//   >
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );


class Home extends React.Component{
  render() {
    return (
      <div>
         {/* <Card> */}
           <Statistic></Statistic>
           {/* </Card> */}
         <div>今日统计</div>
         <Card  bodyStyle={{padding:14}}>
         <div style={{display:'flex',justifyContent:'space-between'}}>
                <Card  bodyStyle={{padding:14}}>
               <PieEcharts id={1}></PieEcharts>
               </Card>
                <Card  bodyStyle={{padding:14}}>
                <PieEcharts id={2}></PieEcharts>
                </Card>
                <Card  bodyStyle={{padding:14}}>
                <PieEcharts id={3}></PieEcharts>
                </Card>
                <Card  bodyStyle={{padding:14}}> 
                <PieEcharts id={4}></PieEcharts>
                </Card>
            </div>    
             {/* <Card><LineEcharts></LineEcharts></Card> */}
              <Card><Highcharts></Highcharts></Card>
           </Card>
          
       
        
      </div>
    );
  }

}
export default  Home
