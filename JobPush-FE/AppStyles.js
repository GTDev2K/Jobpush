//pour contrebalancer le comportement complexe de KeyboardAvoidingView sous Androïd, je force les dimensions selon la taille de ma fenêtre
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default AppStyles = {
    color: {
        background: '#F9F1F1',
        font: '#2B3033',
        accent: "#F72C03",
        cards: "#F3E4E5"
    },
    headerJob : {
        fontFamily: 'Poppins_400Regular',
        color:'#F9F1F1',
        fontSize:24,
        zIndex: 2,
    },
    headerPush : {
        fontFamily: 'Poppins_400Regular',
        color:'#F72C03',
        fontSize : 24,
        zIndex : 2,
    },
    title: {
        alignItems: 'center',
        justifyContent : 'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 32,
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 26,
    },
    important : {
        fontFamily: 'Poppins_300Light_Italic',
        fontSize: 13,
    },
    button : {
        alignItems: 'center',
        justifyContent : 'center' ,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F72C03',
        borderRadius: 10,
        shadowColor: "#2B3033",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,

    },
    buttonText : {
        alignItems: 'center',
        justifyContent : 'center' ,
        color: '#F9F1F1',
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
    },
    input: {
        width: width*0.7,
        backgroundColor: '#FFEEEB', // rose très clair pour input inactif
        borderBottomWidth: 2,
        borderBottomColor: '#FB9581', // rouge pastel pour input inactif
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginBottom: 16,
        color: '#444',
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
    },
    inputFocused: {
        backgroundColor: '#FEDDD7', //rose légèrement plus foncé pour input actif
        borderBottomColor: '#F72C03', // rouge vif pour input actif
        fontFamily: "Poppins_400Regular",
        color: '#2B3033',
    },
    dropdown: {
        width: width*0.7,
        height: 50,
        backgroundColor: '#FFEEEB', // rose très clair comme pour input inactif
        borderBottomWidth: 2,
        borderBottomColor: '#FB9581', // rouge pastel comme pour input inactif
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginBottom: 16,
    },
    placeholderDropdown: {
        color: '#444',
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        marginLeft : 4,
    },
    containerDropdownBottom: {
        width: width*0.7,
        marginTop: -16,
        backgroundColor: '#F3E4E5',
        position: 'bottom',
        backgroundColor: '#F3E4E5', 
        zIndex: 999,
    },
    containerDropdownTop: {
        width: width*0.7,
        marginTop: -16,
        backgroundColor: '#F3E4E5',
        position: 'top',
        backgroundColor: '#F3E4E5', 
        zIndex: 999,
    },
    inputSearch: {
        fontFamily: "Poppins_400Regular",
        color: '#2B3033',
        size: 15,
    },
    itemTextDropdown: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
    },
    link: {
        borderBottomColor: '#F72C03',
        borderBottomWidth: 1,
    },
    body : {
        fontFamily: "Poppins_400Regular",
        color: '#2B3033',
        fontSize: 14,
    },
    linkText : {
        fontFamily: "Poppins_400Regular",
        color: '#2B3033',
        fontSize: 14,
    },
    headline :{
        fontFamily : "Poppins_600SemiBold" ,
        fontSize : 18,

    }
}