import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Dimensions } from 'react-native';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }
    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }
    }
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Text numberOfLines={8} style={styles.descText}>Positionnez votre appareil {"\n"} devant le QR Code</Text>
                            <TouchableOpacity onPress={this.activeQR}>
                                <View style={styles.buttonWrapper}>
                                    <Image source={require('./assets/button-scan-qrcode.png')} style={{height: 150, width: 150}} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Résultat</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <TouchableOpacity onPress={this.scanAgain}>
                                    <Text style={styles.descText}>Clic pour scanner{"\n"}de nouveau</Text>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={require('./assets/button-scan-qrcode.png')} style={{height: 150, width: 150}} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{marginHorizontal: 10, marginTop: 20, justifyContent: 'flex-start'}}>
                                    <Text style={styles.resultText}>Type : {result.type} {result.type == 'EAN_13' && '(code-barres)'} </Text>
                                    <Text style={styles.resultText}>Résultat : {result.data}</Text>
                                    {/*<Text style={styles.resultText} numberOfLines={5}>RawData: {result.rawData}</Text>*/}
                                </View>
                            </View>
                        </Fragment>
                    }
                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                   Positionnez votre appareil {"\n"} devant le QR Code
                                </Text>
                            }
                            bottomContent={
                                <View style={styles.bottomContent}>
                                        <TouchableOpacity style={styles.buttonScan2} 
                                            onPress={() => this.setState({ scan: false })}>
                                            <Image source={require('./assets/scan-cancel.png')} style={{height: 100, width: 100}} />
                                        </TouchableOpacity>

                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}
export default Scan;


const deviceWidth = Dimensions.get('screen').width;
const styles = {
    scrollViewStyle: {
        flex: 1,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    resultText: {
        color: '#008e00',
    },
    cardView: {
        flex:1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanCardView: {
        flex:1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#258ce3',
        paddingTop: 5,
        paddingRight: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        marginTop: 20
    },
    buttonScan2: {
        marginLeft: deviceWidth / 2 - 50,
        width: 100,
        height: 100,
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 32,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
       width: deviceWidth,
       height: 160,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    }
}
