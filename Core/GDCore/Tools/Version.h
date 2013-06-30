#ifndef VERSION_H
#define VERSION_H

namespace AutoVersion{
	
	//Date Version Types
	static const char GDCore_DATE[] = "30";
	static const char GDCore_MONTH[] = "06";
	static const char GDCore_YEAR[] = "2013";
	static const char GDCore_UBUNTU_VERSION_STYLE[] = "13.06";
	
	//Software Status
	static const char GDCore_STATUS[] = "Release";
	static const char GDCore_STATUS_SHORT[] = "r";
	
	//Standard Version Type
	static const long GDCore_MAJOR = 3;
	static const long GDCore_MINOR = 0;
	static const long GDCore_BUILD = 11297;
	static const long GDCore_REVISION = 57008;
	
	//Miscellaneous Version Types
	static const long GDCore_BUILDS_COUNT = 22270;
	#define GDCore_RC_FILEVERSION 3,0,11297,57008
	#define GDCore_RC_FILEVERSION_STRING "3, 0, 11297, 57008\0"
	static const char GDCore_FULLVERSION_STRING[] = "3.0.11297.57008";
	
	//These values are to keep track of your versioning state, don't modify them.
	static const long GDCore_BUILD_HISTORY = 0;
	

}
#endif //VERSION_H