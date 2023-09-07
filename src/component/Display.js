import Vidio3 from "../vidio/vidio3.mp4";
import Vidio2 from "../vidio/vidio2.mp4";
import Vidio1 from "../vidio/vidio1.mp4";
import Vidio4 from "../vidio/vidio4.mp4"
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClockFour, } from "@fortawesome/free-solid-svg-icons";
import { faInstagram,faFacebookF,faYoutube, faInstagramSquare, faSquareInstagram, faWeebly, faSquareXTwitter, faSquareFacebook, faSquareYoutube, faSquareGooglePlus } from "@fortawesome/free-brands-svg-icons";
import Nav from "react-bootstrap/Nav";
import VideoJS from "./Video";
var date = new Date();


function Display() {
   
    //Footer
    const [tanggal, setTanggal] = useState('');
    var time = new Date().toLocaleTimeString();
    const [jam, setJam] = useState(time);

    //AntrianA
    const [dokter, setDokter] = useState('Dokter A');
    const [id, setId] = useState(0);
    const [status, setStatus] = useState(0);
    const [rawat, setRawat] = useState('');
    const [nomor, setNomor] = useState('000');
    const [nama, setNama] = useState('-');
    const [poli, setPoli] = useState('Poliklinik A');

    const [text, setText] = useState('');
    const [play, setPlay] = useState('false');

    //AntrianB
    const [idb, setIdb] = useState(0);
    const [statusb, setStatusb] = useState(0);
    const [rawatb, setRawatb] = useState('');
    const [nomorb, setNomorb] = useState('000');
    const [namab, setNamab] = useState('-');
    const [polib, setPolib] = useState('Poliklinik B');
    const [dokterb, setDokterb] = useState('Dokter B');
    const [textb, setTextb] = useState('');
    const [playb, setPlayb] = useState('false');

    //AntrianC
    const [idc, setIdc] = useState(0);
    const [statusc, setStatusc] = useState(0);
    const [rawatc, setRawatc] = useState('');
    const [nomorc, setNomorc] = useState('000');
    const [namac, setNamac] = useState('-');
    const [polic, setPolic] = useState('Poliklinik C');
    const [dokterc, setDokterc] = useState('Dokter C');
    const [textc, setTextc] = useState('');
    const [playc, setPlayc] = useState('false');
    

    const waktu = () => {
        var tahun = date.getFullYear();
        var bulan = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
        // //Jam
        // var jam = date.getHours();
        // var menit = date.getMinutes();
        // var detik = date.getSeconds();
        switch (hari) {
            case 0: hari = "Minggu"; break;
            case 1: hari = "Senin"; break;
            case 2: hari = "Selasa"; break;
            case 3: hari = "Rabu"; break;
            case 4: hari = "Kamis"; break;
            case 5: hari = "Jum'at"; break;
            case 6: hari = "Sabtu"; break;
        }
        switch (bulan) {
            case 0: bulan = "Januari"; break;
            case 1: bulan = "Februari"; break;
            case 2: bulan = "Maret"; break;
            case 3: bulan = "April"; break;
            case 4: bulan = "Mei"; break;
            case 5: bulan = "Juni"; break;
            case 6: bulan = "Juli"; break;
            case 7: bulan = "Agustus"; break;
            case 8: bulan = "September"; break;
            case 9: bulan = "Oktober"; break;
            case 10: bulan = "November"; break;
            case 11: bulan = "Desember"; break;
        }
        setTanggal(hari + ',' + tanggal + ' ' + bulan + ' ' + tahun)
    }

    const updateTime = () => {
        var time = new Date().toLocaleTimeString();
        setJam(time);
    }

    useEffect(() => {
        waktu()
        setInterval(() => {
            updateTime();
        }, 1000);
    });


    useEffect(() => {
        window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: process.env.REACT_APP_HOST_PUSHER,
            wsPort: process.env.REACT_APP_PORT_PUSHER,
            forceTLS: false,
            disableStats: true,
            encrypted: true,
        });
        echo.channel('polia').listen('.polia-display', (data) => {
            setId(data.message.id)
            setStatus(data.message.status)
            setRawat(data.message.no_rawat)
            setNomor(data.message.no_reg)
            setNama(data.message.nm_pasien)
            setPoli(data.message.nm_poli)
            setDokter(data.message.nm_dokter)
            setText('panggilan, ' + data.message.nm_pasien.toLowerCase().slice(0, -2) + ' nomor antrian, ' + data.message.no_reg + ',ke, ' + data.message.nm_poli)

            if (data.message.status === 1) {
                setPlay('true');
            } else {
                setPlay('false');
                console.log('stop antrian A');
            }
        });

        if (play !== 'false') {
            if (playb === 'true' || playc === 'true') {
                setTimeout(() => {
                    window.responsiveVoice.speak(text, "Indonesian Male")
                }, 5000);
            } else {
                window.responsiveVoice.speak(text, "Indonesian Male")
            }
        }
    }, [play, text, nama, nomor, id,rawat]);

    //Antrian B
    useEffect(() => {
        window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: process.env.REACT_APP_HOST_PUSHER,
            wsPort: process.env.REACT_APP_PORT_PUSHER,
            forceTLS: false,
            disableStats: true,
            encrypted: true,
        });
        echo.channel('polib').listen('.polib-display', (data) => {
            setIdb(data.message.id)
            setStatusb(data.message.status)
            setRawatb(data.message.no_rawat)
            setNomorb(data.message.no_reg)
            setNamab(data.message.nm_pasien)
            setPolib(data.message.nm_poli)
            setDokterb(data.message.nm_dokter)
            setTextb('panggilan, ' + data.message.nm_pasien.toLowerCase().slice(0, -2) + 'nomor antrian, ' + data.message.no_reg + ',ke, ' + data.message.nm_poli)

            if (data.message.status === 1) {
                setPlayb('true');
            } else {
                setPlayb('false');
                console.log('stop antrian B');
            }
        });

        if (playb !== 'false') {
            if (play === 'true' || playc === 'true') {
                setTimeout(() => {
                    window.responsiveVoice.speak(textb, "Indonesian Male")
                }, 5000);
            } else {
                window.responsiveVoice.speak(textb, "Indonesian Male")
            }
        }
    }, [rawatb, playb, textb, idb, namab, nomorb]);

    //Antrian C
    useEffect(() => {
        window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: process.env.REACT_APP_HOST_PUSHER,
            wsPort: process.env.REACT_APP_PORT_PUSHER,
            forceTLS: false,
            disableStats: true,
            encrypted: true,
        });
        echo.channel('polic').listen('.polic-display', (data) => {
            setIdc(data.message.id)
            setStatusc(data.message.status)
            setRawatc(data.message.no_rawat)
            setNomorc(data.message.no_reg)
            setNamac(data.message.nm_pasien)
            setPolic(data.message.nm_poli)
            setDokterc(data.message.nm_dokter)
            setTextc('panggilan, ' + data.message.nm_pasien.toLowerCase().slice(0, -2) + 'nomor antrian, ' + data.message.no_reg + ',ke, ' + data.message.nm_poli)

            if (data.message.status === 1) {
                setPlayc('true');
            } else {
                setPlayc('false');
                console.log('stop antrian C');
            }
        });

        if (playc !== 'false') {
            if (playb === 'true' || play === 'true') {
                setTimeout(() => {
                    window.responsiveVoice.speak(textc, "Indonesian Male")
                }, 5000);
            } else {
                window.responsiveVoice.speak(textc, "Indonesian Male")
            }
        }
    }, [rawatc, playc, textc, idc, namac, nomorc]);

    return (
        <div>
            <Navbar bg="primary" sticky="top" className='navbar-app'>
                <Container fluid>
                    <Nav>
                        <Navbar.Brand>
                            <img
                                alt=""
                                src="/logonavbar.png"
                                width="60"
                                height="60"
                                className="d-inline-block"
                            />{' '}
                            <strong className='title-app'>RS PKU Muhammadiyah Sekapuk</strong>
                        </Navbar.Brand>
                    </Nav>


                    <Nav>
                        <Navbar.Brand>
                            <strong className='title-app'>ANTRIAN POLIKLINIK</strong>
                            {/* <Navbar.Brand className="credit-footer">
                                <FontAwesomeIcon icon={faCalendarDays} /> {tanggal}   <FontAwesomeIcon className="icojam" icon={faClockFour} /> {jam}
                            </Navbar.Brand> */}
                        </Navbar.Brand>
                    </Nav>

                </Container>
            </Navbar>
            <Container fluid>
                <Row className="g-4">
                    <Col xs={12} md={4}>
                        <Card className="text-center card-nomor">
                            <Card.Header className="header-top">{poli} ({dokter})</Card.Header>
                            <Card.Body>
                                <Card.Title className="nama-pasien">{nama}</Card.Title>
                                <Card.Title className="no-antrian">{nomor}</Card.Title>
                            </Card.Body>
                            {/* <Card.Footer className="nama-dokter">{dokter}</Card.Footer> */}
                        </Card>
                        <Card className="text-center card-nomor">
                            <Card.Header className="header-top2">{polib} ({dokterb})</Card.Header>
                            <Card.Body>
                                <Card.Title className="nama-pasien">{namab}</Card.Title>
                                <Card.Title className="no-antrian">{nomorb}</Card.Title>
                            </Card.Body>
                            {/* <Card.Footer className="nama-dokter2">{dokterb}</Card.Footer> */}
                        </Card>
                        <Card className="text-center card-nomor">
                            <Card.Header className="header-top3">{polic} ({dokterc})</Card.Header>
                            <Card.Body>
                                <Card.Title className="nama-pasien">{namac}</Card.Title>
                                <Card.Title className="no-antrian">{nomorc}</Card.Title>
                            </Card.Body>
                            {/* <Card.Footer className="nama-dokter3">{dokterc}</Card.Footer> */}
                        </Card>

                    </Col>

                    <Col xs={12} md={8}>
                        <Card className="center card-nomor">
                            <video controls autoPlay loop muted width="100%" height="auto">
                                <source src={Vidio4} type="video/mp4" />
                                Sorry, your browser doesn't support videos.
                            </video>
                        </Card>

                        {[
                            'primary',
                        ].map((variant) => (
                            <Alert key={variant} variant={variant}>
                             <Alert.Heading className="text-center">
                                <FontAwesomeIcon icon={faInstagramSquare} /> @rs.pkusekapuk
                                <FontAwesomeIcon className="icojam" icon={faSquareFacebook} />  <FontAwesomeIcon icon={faSquareYoutube} /> RS Pku Muhammadiyah Sekapuk
                                <FontAwesomeIcon className="icojam" icon={faSquareGooglePlus} /> www.rspkusekapuk.com
                             </Alert.Heading>
                            </Alert>
                        ))}
                    </Col>
                </Row>
            </Container>
            <Navbar bg="primary" fixed="bottom" className='footer navbar-app'>
                <Container fluid>
                    <marquee direction="left"  className="credit-footer">Selamat Datang Di Rumah Sakit PKU Muhammadiyah Sekapuk</marquee>
                    <Navbar.Brand className="credit-footer">
                        <FontAwesomeIcon icon={faCalendarDays} /> {tanggal}   <FontAwesomeIcon className="icojam" icon={faClockFour} /> {jam}
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Display;

