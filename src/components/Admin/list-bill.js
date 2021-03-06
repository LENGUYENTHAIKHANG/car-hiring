import { Table, Tag, Descriptions, Modal, message, Row, Statistic, Col, Popconfirm } from 'antd'
import axios from 'axios'
import { list } from 'postcss'
import { Fragment, useEffect, useState } from 'react'
import moment from "moment"

const { Column } = Table
const ListBill = () => {
    const [bill, setBill] = useState([])
    const [callAPI, setCallAPI] = useState(false)
    const [popKPI, setPopKpi] = useState(false)
    const [popStatus, setPopStatus] = useState(false);
    const [modalKPI, setModalKPI] = useState(false);
    const [modalExpire, setModalExpire] = useState(false);
    const [expireCar, setExpireCar] = useState([]);
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [rentVisible, setRentVisible] = useState(false)
    const [billDetail, setBillDetail] = useState({
        startDate: '',
        endDate: ''
    })
    const [total, setTotal] = useState(0)
    const [totalAll, setTotalAll] = useState(0);
    const [listCar, setListCar] = useState([])
    const start = billDetail.startDate.replaceAll("-", " ").split(" ")[2]
    const end = billDetail.endDate.replaceAll("-", " ").split(" ")[2]
    const showDetail = (data) => {
        setBillDetail(data)
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/bill/${data.idBill}`)
                .then(res => {
                    console.log(res.data)
                    setListCar(res.data.vehicle)
                    let arr = []
                    let reduceType = (a, b) => a + b
                    res.data.vehicle.forEach(item => {
                        arr.push(item.price)
                    })
                    setTotal(arr.reduce(reduceType))
                })
        } catch (error) {
            console.log(error)
        }
        setVisible(true)
    }
    const [render, setRender] = useState(0)
    const onSubmitRent = (detail) => {
        const data = {
            status: 'In progress'
        }
        try {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/bill/admin/confirm/${detail}`, data)
                .then(res => {
                    if (res.data.status === 'SUCCESS') {
                        message.success('C???p nh???t th??nh c??ng')
                        setRentVisible(false)
                        setVisible(false)
                        setRender(render + 1)
                    }
                    else message.error('???? x???y ra l???i, vui l??ng ki???m tra l???i')
                })
        } catch (error) {
            console.log(error)
            message.error('???? x???y ra l???i, vui l??ng ki???m tra l???i')
        }
    }
    const onDeleteBill = (detail) => {
        try {
            axios.delete(`https://mighty-meadow-74982.herokuapp.com/bill/${detail}`)
                .then(res => {
                    if (res.data.status === 'SUCCESS') {
                        message.success('Hu??? th??nh c??ng')
                        setDeleteVisible(false)
                        setVisible(false)
                        setRender(render + 1)
                    }
                    else message.error('???? x???y ra l???i, vui l??ng ki???m tra l???i')
                })
        } catch (error) {
            console.log(error)
            message.error('???? x???y ra l???i, vui l??ng ki???m tra l???i')
        }
    }
    useEffect(() => {
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/bill')
                .then(res=> {
                    let totalPrice = 0;
                    res.data.data.map(item => {
                        if(new Date() >= new Date(item.endDate) && item.status !== "Done") {
                            setExpireCar([...expireCar, item])
                        }
                        if(item.status !== "Waiting for admin") {
                            totalPrice += item.total;
                        }
                    });
                    setTotalAll(totalPrice);
                    setBill(res.data.data);
                })
        } catch (error) {
            console.log(error)
        }
    },[render])

    useEffect(() => {
        if(expireCar) {
            setPopStatus(true)
        }
    }, [JSON.stringify(expireCar)])

    const onConfirmKPI = () => {
        setModalKPI(true);
        setPopKpi(false);
    }

    const onCancelKPI = () => {
        setPopKpi(false);
    }

    const onConfirmUpdateBill = () => {
        setModalExpire(true)
        setPopStatus(false)
    }

    const onCancelUpdateBill = () => {
        setPopStatus(false)
    }

    const handleKPIOK = () => {
        const insertKPI = {
            total: totalAll || 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            percentResult: totalAll/100000000
        }
        axios.post("https://mighty-meadow-74982.herokuapp.com/bill/KPI", insertKPI)
        .then(res => {
            message.success("Ch???t s??? th??nh c??ng")
        })
        .catch(e => message.error("Ch???t s??? th???t b???i, ???? c?? l???i x???y ra"))
        setModalKPI(false);
        setPopKpi(false)
    }

    const handleKPICancel = () => {
        setModalKPI(false);
        setPopKpi(false);
    }

    const handleUpdateOK = () => {
        const status = {
            status: "Done"
        }
        expireCar.map(bill => {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/bill/admin/confirm/${bill.idBill}`, status)
            .then(res => {
                console.log(res);
                setModalExpire(false);
                setPopStatus(false)
            })
            .catch(e => console.log(e))
        })
    }

    const handleCancelUpdate = () => {
        setModalExpire(false);
        setPopStatus(false);
    }

    useEffect(() => {
        const currentTime = new Date();
        const lastDayOfMonth = new Date(currentTime.getFullYear(),currentTime.getMonth(),0);
        if(Math.round(currentTime - lastDayOfMonth) >= 0) {
            console.log(Math.round(currentTime - lastDayOfMonth))
            setPopKpi(true);
        }   
    },[render])
    
    return(
        <div className="container compo">
            <div className="row">
            <h4 className="mt-5 mb-5">B???ng l???ch s??? h??a ????n</h4>
            <Popconfirm 
                title="???? ?????n ng??y cu???i trong th??ng, b???n mu???n ch???t s??? ch???"
                visible={popKPI}
                onConfirm={onConfirmKPI}
                onCancel={onCancelKPI}
            >
            </Popconfirm>

            <Popconfirm 
                title="C?? h??a ????n ?????n h???n, b???n mu???n duy???t ch???"
                visible={popStatus}
                onConfirm={onConfirmUpdateBill}
                onCancel={onCancelUpdateBill}
            >
            </Popconfirm>
        
            <Modal width={1000} footer={false} visible={visible} onCancel={()=>setVisible(false)}>
                <Descriptions title="Chi ti???t ????n ?????t" bordered>
                    <Descriptions.Item label="S??? ??i???n tho???i KH" >
                        {billDetail.phone?<span>{billDetail.phone}</span>:<span>0909123456</span>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tr???ng th??i">
                        {billDetail.status === "Waiting for admin"?<Tag color="blue"> {billDetail.status} </Tag>
                    : billDetail.status === "Done" ? <Tag color="red"> {billDetail.status} </Tag> : <Tag color="gold"> {billDetail.status} </Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="S??? ng??y" span={1}>
                        {end - start}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ng??y nh???n">
                        {billDetail.startDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ng??y tr???" span={2}>
                        {billDetail.endDate}
                    </Descriptions.Item>

                        <Descriptions.Item label="?????a ch???" span={3}>
                            {billDetail.place}
                        </Descriptions.Item>
                        {listCar.map(item => {
                            return (
                                <Fragment>
                                    <Descriptions.Item label="T??n xe"> {item.name} </Descriptions.Item>
                                    <Descriptions.Item label="Gi?? theo ng??y" span={2}> {new Intl.NumberFormat().format(item.price)} VND</Descriptions.Item>
                                </Fragment>
                            )
                        })}
                        <Descriptions.Item label="T???ng ti???n" span={2}>
                            <h6 style={{ marginBottom: '0' }}><b>{new Intl.NumberFormat().format(total * (end - start))} VND</b></h6>
                        </Descriptions.Item>
                    </Descriptions>
                    {billDetail.status === 'Waiting for admin' &&
                        <div className="d-flex btn-confirm-container">
                            <Modal visible={deleteVisible} footer={false} onCancel={() => setDeleteVisible(false)}>
                                <h6>B???n c?? ch???c mu???n hu??? ????n ?????t xe c???a kh??ch?</h6>
                                <p className="mb-5">N???u ?????ng ?? h??y nh???n Ok </p>
                                <div className="d-flex btn-confirm-container" style={{ borderTop: '1px solid #eee' }}>
                                    <button className="btn-delete-rent" onClick={()=>setDeleteVisible(false)}>????ng</button>
                                    <button className="btn-submit-rent ml-2" onClick={()=>onDeleteBill(billDetail.idBill)}>?????ng ??</button>
                                </div>
                            </Modal>
                            <Modal visible={rentVisible} footer={false} onCancel={() => setRentVisible(false)}>
                                <h6>B???n c?? ch???c mu???n cho thu???</h6>
                                <p className="mb-5">N???u ?????ng ?? h??y nh???n Ok </p>
                                <div className="d-flex btn-confirm-container" style={{ borderTop: '1px solid #eee' }}>
                                    <button className="btn-delete-rent" onClick={()=>setRentVisible(false)}>????ng</button>
                                    <button className="btn-submit-rent ml-2" onClick={()=>onSubmitRent(billDetail.idBill)}>?????ng ??</button>
                                </div>
                            </Modal>
                            <button onClick={() => setRentVisible(true)} className="btn-submit-rent">X??c nh???n cho thu??</button>
                            <button onClick={() => setDeleteVisible(true)} className="btn-delete-rent">Hu??? ????n ?????t</button>
                        </div>
                    }
            </Modal>

            <Modal
                visible={modalKPI}
                className="container"
                onOk={handleKPIOK}
                onCancel={handleKPICancel}
            >
                <h4>Ch???t s??? doanh thu th??ng {new Date().getMonth()}</h4>
                <Row gutter={32}>
                    <Col span={8}>
                        <Statistic title="Doanh thu hi???n t???i" value={totalAll}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Th??ng hi???n t???i" value={new Date().getMonth()}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Ch??? ti??u ?????t ra" value={100000000}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Ph???n tr??m doanh s???" value={totalAll/100000000 * 100}/>
                    </Col>
                </Row>
            </Modal>

            <Modal
                visible={modalExpire}
                width={700}
                className="container"
                onOk={handleUpdateOK}
                onCancel={handleCancelUpdate}
            >
                <h4>Danh s??ch h??a ????n ?????n h???n</h4>
                <Table
                    dataSource={expireCar}
                >
                    <Column title="M?? h??a ????n" dataIndex="idBill" render={id => id.substr(0,5)}/>
                    <Column title="M?? KH" dataIndex="idUser" render={id => id.substr(0,5)}/>
                    <Column title="Ng??y k???t thuc" dataIndex="endDate" render={time => moment(time).format("YYYY-MM-DD hh:mm")}/>
                    <Column title="T???ng ti???n" dataIndex="total" render={total => total + "VND"}/>
                    <Column title="S??? ??i???n tho???i" dataIndex="phone"/>
                </Table>
            </Modal>

            <Table
                    bordered
                    dataSource={bill}
                >
                    <Column title="Ng??y nh???n" dataIndex="startDate" key="startDate" />
                    <Column title="Ng??y tr???" dataIndex="endDate" key="endDate" />
                    <Column title="Tr???ng th??i" key="status"
                        render={data => {
                            if (data.status === "Waiting for admin")
                                return <Tag color="blue"> {data.status} </Tag>
                            if (data.status === "Done")
                                return <Tag color="red"> {data.status} </Tag>
                            else
                                return <Tag color="gold"> {data.status} </Tag>
                        }}
                    />
                    <Column title="S??? ??i???n tho???i" key="total"
                        render={data => (
                            <span> {data.phone ? data.phone : "0909123456"} </span>
                        )}
                    />
                    <Column title="?????a ch???" dataIndex="place" key="place" />
                    <Column title="H??nh ?????ng" key="action" width="120px"
                        render={action => (
                            <div className="d-flex">
                                <button onClick={() => { showDetail(action) }} className="btn-detail">Chi ti???t</button>
                            </div>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}
export default ListBill