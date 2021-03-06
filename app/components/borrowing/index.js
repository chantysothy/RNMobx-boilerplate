/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { observer, inject } from "mobx-react";

import BorrowingList from "./BorrowingList";
import { Borrowings as BorrowingsStore } from "../../stores/borrowings";
import { AuthStore } from "../../stores/authUser";
@inject("authStore", "borrowingsStore")
@observer
export default class Borrowing extends Component {
  props: {
    authStore: AuthStore,
    borrowingsStore: BorrowingsStore
  };
  componentDidMount() {
    this.props.borrowingsStore
      .loadMore(
        { page: 1 },
        this.props.authStore.jwt,
        this.props.authStore.orgBaseInfo.id
      )
      .then(() => {})
      .catch(reason => {
        console.log("this.props.borrowingStore.loadMore error : ", reason);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <BorrowingList data={this.props.borrowingsStore.borrowings} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
